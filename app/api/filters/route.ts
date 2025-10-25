import { NextResponse } from 'next/server';
import { getFilterOptions } from '@/lib/db/postgres';

/**
 * GET /api/filters
 * Get all unique filter options from the database
 */
export async function GET() {
  try {
    const options = await getFilterOptions();

    return NextResponse.json({
      success: true,
      data: options,
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch filter options',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
