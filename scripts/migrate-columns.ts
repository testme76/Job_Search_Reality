import 'dotenv/config';

async function migrateColumns() {
  try {
    const { sql } = await import('@vercel/postgres');

    console.log('Starting migration: Converting boolean columns to VARCHAR...\n');

    // First, let's see what data we currently have
    const sampleData = await sql`
      SELECT has_return_offer, needs_sponsorship
      FROM survey_responses
      LIMIT 5
    `;
    console.log('Sample current data:', sampleData.rows);

    // Alter has_return_offer column
    console.log('\nAltering has_return_offer column...');
    await sql`
      ALTER TABLE survey_responses
      ALTER COLUMN has_return_offer TYPE VARCHAR(100)
      USING has_return_offer::text
    `;
    console.log('✓ has_return_offer migrated to VARCHAR(100)');

    // Alter needs_sponsorship column
    console.log('\nAltering needs_sponsorship column...');
    await sql`
      ALTER TABLE survey_responses
      ALTER COLUMN needs_sponsorship TYPE VARCHAR(100)
      USING needs_sponsorship::text
    `;
    console.log('✓ needs_sponsorship migrated to VARCHAR(100)');

    console.log('\n✅ Migration completed successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateColumns();
