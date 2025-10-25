/**
 * Fix database schema to allow longer text fields
 *
 * Usage:
 *   npx tsx scripts/fix-schema.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

async function fixSchema() {
  const { sql } = await import('@vercel/postgres');

  console.log('🔧 Fixing database schema...\n');

  try {
    // Alter columns to allow longer text
    await sql`ALTER TABLE survey_responses ALTER COLUMN degree TYPE VARCHAR(100)`;
    console.log('✓ Updated degree column to VARCHAR(100)');

    await sql`ALTER TABLE survey_responses ALTER COLUMN school_tier TYPE VARCHAR(150)`;
    console.log('✓ Updated school_tier column to VARCHAR(150)');

    await sql`ALTER TABLE survey_responses ALTER COLUMN graduating_time TYPE VARCHAR(100)`;
    console.log('✓ Updated graduating_time column to VARCHAR(100)');

    await sql`ALTER TABLE survey_responses ALTER COLUMN when_started_applying TYPE VARCHAR(100)`;
    console.log('✓ Updated when_started_applying column to VARCHAR(100)');

    console.log('\n✅ Schema updated successfully!');
    console.log('You can now re-run: npm run import-sheets');
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

fixSchema();
