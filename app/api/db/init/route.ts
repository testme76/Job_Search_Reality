import { NextResponse } from 'next/server';
import { initializeDatabase } from '@/lib/db/postgres';

/**
 * API Route to initialize the database schema
 * GET /api/db/init
 *
 * This should be called once after creating your Vercel Postgres database
 * to set up the necessary tables and indexes.
 */
export async function GET() {
  try {
    await initializeDatabase();
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
    });
  } catch (error) {
    console.error('Database initialization failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to initialize database',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
