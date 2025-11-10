import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

interface SheetRow {
  timestamp: Date;
  total_applications: number;
  total_responses: number;
  total_first_round: number;
  total_final_round: number;
  total_offers: number;
  major: string;
  degree: string;
  school_tier: string;
  gpa_range: string;
  graduating_time: string;
  internship_count: number;
  has_return_offer: string;
  needs_sponsorship: string;
  when_started_applying: string;
}

async function fetchFromGoogleSheets(): Promise<SheetRow[]> {
  if (!SHEET_ID || !API_KEY) {
    throw new Error('Missing Google Sheets credentials');
  }

  const range = "'Public Data'!A2:O";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const rows = data.values || [];

  return rows.map((row: any[]) => {
    // Parse timestamp from column A (row[0])
    const timestampStr = row[0] || new Date().toISOString();
    let timestamp: Date;
    try {
      timestamp = new Date(timestampStr);
      // If invalid date, use current time
      if (isNaN(timestamp.getTime())) {
        timestamp = new Date();
      }
    } catch {
      timestamp = new Date();
    }

    const internshipText = row[9] || "0";
    const internshipMatch = internshipText.match(/(\d+)/);
    const internshipCount = internshipMatch ? parseInt(internshipMatch[1]) : 0;

    // Convert return offer status to descriptive string
    const returnOfferText = String(row[10] || "").toLowerCase();
    let hasReturnOffer = "No, I don't have a return offer";
    if (returnOfferText.includes('yes') && returnOfferText.includes('searching')) {
      hasReturnOffer = "Yes, but I'm still searching...";
    } else if (returnOfferText.includes('yes') && returnOfferText.includes('accepted')) {
      hasReturnOffer = "Yes, I accepted my return offer";
    } else if (returnOfferText.includes('yes')) {
      hasReturnOffer = "Yes, but I'm still searching...";
    }

    // Convert sponsorship status to descriptive string
    const sponsorshipText = String(row[11] || "").toLowerCase();
    let needsSponsorship = "No, US citizen";
    if (sponsorshipText.includes('yes') || sponsorshipText.includes('need')) {
      needsSponsorship = "Yes, I need sponsorship";
    } else if (sponsorshipText.includes('permanent') || sponsorshipText.includes('resident')) {
      needsSponsorship = "No, permanent resident";
    }

    return {
      timestamp,
      total_applications: parseInt(row[1]) || 0,
      total_responses: parseInt(row[2]) || 0,
      total_first_round: parseInt(row[3]) || 0,
      total_final_round: parseInt(row[4]) || 0,
      total_offers: parseInt(row[5]) || 0,
      major: row[6] || "Unknown",
      school_tier: row[7] || "Unknown",
      degree: row[8] || "Unknown",
      internship_count: internshipCount,
      has_return_offer: hasReturnOffer,
      needs_sponsorship: needsSponsorship,
      graduating_time: row[12] || "Unknown",
      gpa_range: row[13] || "Unknown",
      when_started_applying: row[14] || "Unknown",
    };
  });
}

export async function GET(request: NextRequest) {
  try {
    // Optional: Add authorization check
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting sync from Google Sheets...');

    // Fetch from Google Sheets
    const records = await fetchFromGoogleSheets();

    if (records.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No records found in Google Sheets',
        synced: 0
      });
    }

    // Get current count in DB
    const currentCount = await sql`SELECT COUNT(*) as count FROM survey_responses`;
    const dbCount = parseInt(currentCount.rows[0].count);

    // Clear existing data and insert fresh data
    await sql`DELETE FROM survey_responses`;

    let successCount = 0;
    let errorCount = 0;

    for (const record of records) {
      try {
        await sql`
          INSERT INTO survey_responses (
            timestamp,
            total_applications,
            total_responses,
            total_first_round,
            total_final_round,
            total_offers,
            major,
            degree,
            school_tier,
            gpa_range,
            graduating_time,
            internship_count,
            has_return_offer,
            needs_sponsorship,
            when_started_applying
          ) VALUES (
            ${record.timestamp.toISOString()},
            ${record.total_applications},
            ${record.total_responses},
            ${record.total_first_round},
            ${record.total_final_round},
            ${record.total_offers},
            ${record.major},
            ${record.degree},
            ${record.school_tier},
            ${record.gpa_range},
            ${record.graduating_time},
            ${record.internship_count},
            ${record.has_return_offer},
            ${record.needs_sponsorship},
            ${record.when_started_applying}
          )
        `;
        successCount++;
      } catch (error) {
        errorCount++;
        console.error('Error inserting record:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Sync completed',
      previousCount: dbCount,
      sheetsCount: records.length,
      synced: successCount,
      errors: errorCount,
    });

  } catch (error) {
    console.error('Sync failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Sync failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
