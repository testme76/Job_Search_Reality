/**
 * Clear all data from survey_responses table
 *
 * Usage:
 *   npx tsx scripts/clear-data.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

async function clearData() {
  const { sql } = await import('@vercel/postgres');

  console.log('⚠️  WARNING: This will delete ALL data from survey_responses table!\n');

  try {
    const countBefore = await sql`SELECT COUNT(*) as count FROM survey_responses`;
    const total = parseInt(countBefore.rows[0].count);

    console.log(`📊 Current records: ${total}`);

    if (total === 0) {
      console.log('✓ Table is already empty');
      return;
    }

    // Delete all records
    await sql`DELETE FROM survey_responses`;

    const countAfter = await sql`SELECT COUNT(*) as count FROM survey_responses`;
    const remaining = parseInt(countAfter.rows[0].count);

    console.log(`\n✅ Deleted ${total} records`);
    console.log(`📊 Remaining records: ${remaining}\n`);
    console.log('You can now run: npm run import-sheets');

  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

clearData();
