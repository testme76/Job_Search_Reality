import { sql } from '@vercel/postgres';

async function checkBooleanData() {
  try {
    console.log('Checking for boolean values in has_return_offer and needs_sponsorship...\n');

    const { rows } = await sql`
      SELECT
        id,
        has_return_offer,
        needs_sponsorship
      FROM survey_responses
      LIMIT 20
    `;

    console.log('Sample data:');
    rows.forEach(row => {
      console.log(`ID ${row.id}:`);
      console.log(`  has_return_offer: "${row.has_return_offer}" (type: ${typeof row.has_return_offer})`);
      console.log(`  needs_sponsorship: "${row.needs_sponsorship}" (type: ${typeof row.needs_sponsorship})`);
      console.log('');
    });

    // Check for boolean-like values
    const booleanCheck = await sql`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN has_return_offer IN ('true', 'false', 't', 'f') THEN 1 ELSE 0 END) as boolean_return_offer,
        SUM(CASE WHEN needs_sponsorship IN ('true', 'false', 't', 'f') THEN 1 ELSE 0 END) as boolean_sponsorship
      FROM survey_responses
    `;

    console.log('\nBoolean value count:');
    console.log(`Total rows: ${booleanCheck.rows[0].total}`);
    console.log(`Rows with boolean has_return_offer: ${booleanCheck.rows[0].boolean_return_offer}`);
    console.log(`Rows with boolean needs_sponsorship: ${booleanCheck.rows[0].boolean_sponsorship}`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkBooleanData();
