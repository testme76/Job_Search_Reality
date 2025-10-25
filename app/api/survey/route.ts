import { NextRequest, NextResponse } from 'next/server';
import { getSurveyResponses, insertSurveyResponse } from '@/lib/db/postgres';
import { DashboardFilters } from '@/lib/types';

/**
 * GET /api/survey
 * Fetch survey responses with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters: DashboardFilters = {};

    const major = searchParams.get('major');
    if (major) filters.major = major;

    const schoolTier = searchParams.get('school_tier');
    if (schoolTier) filters.school_tier = schoolTier;

    const sponsorship = searchParams.get('needs_sponsorship');
    if (sponsorship !== null) filters.needs_sponsorship = sponsorship;

    const responses = await getSurveyResponses(filters);

    return NextResponse.json({
      success: true,
      data: responses,
      count: responses.length,
    });
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch survey responses',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/survey
 * Insert a new survey response
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'total_applications',
      'total_responses',
      'total_first_round',
      'total_final_round',
      'total_offers',
      'major',
      'degree',
      'school_tier',
      'gpa_range',
      'graduating_time',
      'internship_count',
      'has_return_offer',
      'needs_sponsorship',
      'when_started_applying',
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    const response = await insertSurveyResponse({
      total_applications: parseInt(body.total_applications),
      total_responses: parseInt(body.total_responses),
      total_first_round: parseInt(body.total_first_round),
      total_final_round: parseInt(body.total_final_round),
      total_offers: parseInt(body.total_offers),
      major: body.major,
      degree: body.degree,
      school_tier: body.school_tier,
      gpa_range: body.gpa_range,
      graduating_time: body.graduating_time,
      internship_count: parseInt(body.internship_count),
      has_return_offer: body.has_return_offer,
      needs_sponsorship: body.needs_sponsorship,
      when_started_applying: body.when_started_applying,
    });

    return NextResponse.json({
      success: true,
      data: response,
    }, { status: 201 });
  } catch (error) {
    console.error('Error inserting survey response:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to insert survey response',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
