/**
 * Check data in Postgres database
 *
 * Usage:
 *   npx tsx scripts/check-data.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

async function checkData() {
  const { sql } = await import('@vercel/postgres');

  console.log('🔍 Checking database data...\n');

  try {
    // Count total records
    const countResult = await sql`SELECT COUNT(*) as count FROM survey_responses`;
    const totalCount = parseInt(countResult.rows[0].count);

    console.log(`📊 Total records: ${totalCount}\n`);

    if (totalCount === 0) {
      console.log('⚠️  No data found in database');
      return;
    }

    // Show first 5 records
    const sampleResult = await sql`
      SELECT
        id,
        total_applications,
        total_offers,
        major,
        degree,
        school_tier,
        graduating_time
      FROM survey_responses
      ORDER BY id
      LIMIT 5
    `;

    console.log('📋 Sample records:\n');
    console.table(sampleResult.rows);

    // Show statistics by major
    const majorStats = await sql`
      SELECT
        major,
        COUNT(*) as count,
        AVG(total_applications)::NUMERIC(10,1) as avg_apps
      FROM survey_responses
      GROUP BY major
      ORDER BY count DESC
    `;

    console.log('\n📈 Records by major:\n');
    console.table(majorStats.rows);

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

checkData();
