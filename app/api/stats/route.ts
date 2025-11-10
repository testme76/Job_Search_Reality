import { NextRequest, NextResponse } from 'next/server';
import { getAggregatedStats, getFilterOptions } from '@/lib/db/postgres';
import { DashboardFilters } from '@/lib/types';

export const revalidate = 60; // Cache for 60 seconds
/**
 * GET /api/stats
 * Get aggregated statistics with optional filters
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


    const stats = await getAggregatedStats(filters);

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching aggregated stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch aggregated stats',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
