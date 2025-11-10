import { sql } from '@vercel/postgres';

async function fixBooleanStrings() {
  try {
    console.log('Converting boolean strings to descriptive text...\n');

    // Update has_return_offer
    const returnOfferResult = await sql`
      UPDATE survey_responses
      SET has_return_offer = CASE
        WHEN has_return_offer IN ('true', 't', 'yes') THEN 'Yes, but I''m still searching...'
        WHEN has_return_offer IN ('false', 'f', 'no') THEN 'No, I don''t have a return offer'
        ELSE has_return_offer
      END
      WHERE has_return_offer IN ('true', 'false', 't', 'f', 'yes', 'no')
    `;

    console.log(`Updated has_return_offer for ${returnOfferResult.rowCount} rows`);

    // Update needs_sponsorship
    const sponsorshipResult = await sql`
      UPDATE survey_responses
      SET needs_sponsorship = CASE
        WHEN needs_sponsorship IN ('true', 't', 'yes') THEN 'Yes, I need sponsorship'
        WHEN needs_sponsorship IN ('false', 'f', 'no') THEN 'No, US citizen'
        ELSE needs_sponsorship
      END
      WHERE needs_sponsorship IN ('true', 'false', 't', 'f', 'yes', 'no')
    `;

    console.log(`Updated needs_sponsorship for ${sponsorshipResult.rowCount} rows`);

    // Verify the changes
    const { rows } = await sql`
      SELECT
        has_return_offer,
        needs_sponsorship,
        COUNT(*) as count
      FROM survey_responses
      GROUP BY has_return_offer, needs_sponsorship
      ORDER BY count DESC
    `;

    console.log('\nCurrent distribution:');
    rows.forEach(row => {
      console.log(`${row.count} rows with:`);
      console.log(`  has_return_offer: "${row.has_return_offer}"`);
      console.log(`  needs_sponsorship: "${row.needs_sponsorship}"`);
      console.log('');
    });

    console.log('✅ Migration complete!');

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixBooleanStrings();
