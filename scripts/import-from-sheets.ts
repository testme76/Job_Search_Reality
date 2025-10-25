/**
 * One-time migration script: Google Sheets → Vercel Postgres
 *
 * Prerequisites:
 * 1. Set up Vercel Postgres and add env vars to .env.local
 * 2. Initialize database: visit http://localhost:3000/api/db/init
 * 3. Ensure Google Sheets credentials are still in .env.local
 *
 * Usage:
 *   npx tsx scripts/import-from-sheets.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

// Import after env vars are loaded
const SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

interface SheetRow {
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
  has_return_offer: boolean;
  needs_sponsorship: boolean;
  when_started_applying: string;
}

async function fetchFromGoogleSheets(): Promise<SheetRow[]> {
  if (!SHEET_ID || !API_KEY) {
    throw new Error('Missing Google Sheets credentials. Check NEXT_PUBLIC_GOOGLE_SHEET_ID and NEXT_PUBLIC_GOOGLE_API_KEY in .env.local');
  }

  const range = "'Public Data'!A2:O";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

  console.log('📥 Fetching data from Google Sheets...');
  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google Sheets API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const rows = data.values || [];

  console.log(`✅ Fetched ${rows.length} rows from Google Sheets`);

  return rows.map((row: any[]) => {
    // Parse internship count from text like "0 internships", "1 internship", "2+ internships"
    const internshipText = row[9] || "0";
    const internshipMatch = internshipText.match(/(\d+)/);
    const internshipCount = internshipMatch ? parseInt(internshipMatch[1]) : 0;

    // Parse boolean fields
    const hasReturnOffer = row[10] ? String(row[10]).toLowerCase().includes('yes') : false;
    const needsSponsorship = row[11] ? String(row[11]).toLowerCase().includes('yes') : false;

    return {
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

async function insertIntoPostgres(records: SheetRow[]): Promise<void> {
  // Dynamic import to ensure env vars are loaded first
  const { sql } = await import('@vercel/postgres');

  console.log('📤 Inserting data into Postgres...');

  let successCount = 0;
  let errorCount = 0;

  for (const record of records) {
    try {
      await sql`
        INSERT INTO survey_responses (
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
      if (successCount % 10 === 0) {
        console.log(`  ✓ Inserted ${successCount}/${records.length} records...`);
      }
    } catch (error) {
      errorCount++;
      console.error(`  ✗ Error inserting record:`, error instanceof Error ? error.message : error);
    }
  }

  console.log(`\n✅ Import complete!`);
  console.log(`   Success: ${successCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Total: ${records.length}`);
}

async function main() {
  try {
    console.log('🚀 Starting Google Sheets → Postgres migration\n');

    // Step 1: Fetch from Google Sheets
    const records = await fetchFromGoogleSheets();

    if (records.length === 0) {
      console.log('⚠️  No records found in Google Sheets. Exiting.');
      return;
    }

    // Step 2: Insert into Postgres
    await insertIntoPostgres(records);

    console.log('\n🎉 Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Verify data: Check your Vercel Postgres dashboard');
    console.log('2. Test API: Visit http://localhost:3000/api/responses');
    console.log('3. Update code: Switch API routes to use Postgres');

  } catch (error) {
    console.error('\n❌ Migration failed:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
