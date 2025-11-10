import { sql } from '@vercel/postgres';
import { SurveyResponse, DashboardFilters, AggregatedStats } from '@/lib/types';

/**
 * Initialize database schema
 * Run this once to set up the database tables
 */
export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS survey_responses (
        id SERIAL PRIMARY KEY,

        -- Application statistics
        total_applications INTEGER NOT NULL,
        total_responses INTEGER NOT NULL,
        total_first_round INTEGER NOT NULL,
        total_final_round INTEGER NOT NULL,
        total_offers INTEGER NOT NULL,

        -- Academic background
        major VARCHAR(100) NOT NULL,
        degree VARCHAR(50) NOT NULL,
        school_tier VARCHAR(50) NOT NULL,
        gpa_range VARCHAR(20) NOT NULL,
        graduating_time VARCHAR(50) NOT NULL,

        -- Experience
        internship_count INTEGER NOT NULL,
        has_return_offer VARCHAR(100) NOT NULL,

        -- Job search details
        needs_sponsorship VARCHAR(100) NOT NULL,
        when_started_applying VARCHAR(50) NOT NULL,

        -- Metadata
        timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS idx_major ON survey_responses(major)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_degree ON survey_responses(degree)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_school_tier ON survey_responses(school_tier)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_needs_sponsorship ON survey_responses(needs_sponsorship)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_has_return_offer ON survey_responses(has_return_offer)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_gpa_range ON survey_responses(gpa_range)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_timestamp ON survey_responses(timestamp DESC)`;

    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

/**
 * Fetch survey responses with optional filters
 */
export async function getSurveyResponses(
  filters?: DashboardFilters
): Promise<SurveyResponse[]> {
  try {
    // Build WHERE conditions for SQL filtering
    const conditions: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (filters?.major) {
      conditions.push(`major = $${paramIndex++}`);
      values.push(filters.major);
    }
    if (filters?.degree) {
      conditions.push(`degree = $${paramIndex++}`);
      values.push(filters.degree);
    }
    if (filters?.school_tier) {
      conditions.push(`school_tier = $${paramIndex++}`);
      values.push(filters.school_tier);
    }
    if (filters?.gpa_range) {
      conditions.push(`gpa_range = $${paramIndex++}`);
      values.push(filters.gpa_range);
    }
    if (filters?.needs_sponsorship !== undefined) {
      conditions.push(`LOWER(needs_sponsorship) LIKE LOWER($${paramIndex++})`);
      values.push(`%${filters.needs_sponsorship}%`);
    }
    if (filters?.has_return_offer !== undefined) {
      conditions.push(`LOWER(has_return_offer) LIKE LOWER($${paramIndex++})`);
      values.push(`%${filters.has_return_offer}%`);
    }
    if (filters?.graduating_time) {
      conditions.push(`graduating_time = $${paramIndex++}`);
      values.push(filters.graduating_time);
    }
    if (filters?.when_started_applying) {
      conditions.push(`when_started_applying = $${paramIndex++}`);
      values.push(filters.when_started_applying);
    }
    if (filters?.internship_count !== undefined) {
      conditions.push(`internship_count = $${paramIndex++}`);
      values.push(parseInt(filters.internship_count, 10));
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const queryText = `SELECT * FROM survey_responses ${whereClause} ORDER BY timestamp DESC`;

    console.log('DB Query:', queryText);
    console.log('DB Values:', values);

    const { rows } = await sql.query(queryText, values);

    return rows.map((row: any) => ({
      id: row.id.toString(),
      total_applications: row.total_applications,
      total_responses: row.total_responses,
      total_first_round: row.total_first_round,
      total_final_round: row.total_final_round,
      total_offers: row.total_offers,
      major: row.major,
      degree: row.degree,
      school_tier: row.school_tier,
      gpa_range: row.gpa_range,
      graduating_time: row.graduating_time,
      internship_count: row.internship_count,
      has_return_offer: row.has_return_offer,
      needs_sponsorship: row.needs_sponsorship,
      when_started_applying: row.when_started_applying,
      timestamp: new Date(row.timestamp),
    }));
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    throw error;
  }
}

/**
 * Calculate aggregated statistics from survey responses
 */
export async function getAggregatedStats(
  filters?: DashboardFilters
): Promise<AggregatedStats> {
  try {
    // Build WHERE conditions
    const conditions: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (filters?.major) {
      conditions.push(`major = $${paramIndex++}`);
      values.push(filters.major);
    }
    if (filters?.degree) {
      conditions.push(`degree = $${paramIndex++}`);
      values.push(filters.degree);
    }
    if (filters?.school_tier) {
      conditions.push(`school_tier = $${paramIndex++}`);
      values.push(filters.school_tier);
    }
    if (filters?.gpa_range) {
      conditions.push(`gpa_range = $${paramIndex++}`);
      values.push(filters.gpa_range);
    }
    if (filters?.needs_sponsorship !== undefined) {
      conditions.push(`needs_sponsorship = $${paramIndex++}`);
      values.push(filters.needs_sponsorship);
    }
    if (filters?.has_return_offer !== undefined) {
      conditions.push(`has_return_offer = $${paramIndex++}`);
      values.push(filters.has_return_offer);
    }
    if (filters?.graduating_time) {
      conditions.push(`graduating_time = $${paramIndex++}`);
      values.push(filters.graduating_time);
    }
    if (filters?.when_started_applying) {
      conditions.push(`when_started_applying = $${paramIndex++}`);
      values.push(filters.when_started_applying);
    }
    if (filters?.internship_count !== undefined) {
      conditions.push(`internship_count = $${paramIndex++}`);
      values.push(parseInt(filters.internship_count, 10));
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const queryText = `
      SELECT
        COUNT(*) as total_survey_count,
        AVG(total_applications)::NUMERIC(10,2) as avg_applications,
        AVG(total_responses)::NUMERIC(10,2) as avg_responses,
        AVG(total_first_round)::NUMERIC(10,2) as avg_first_round,
        AVG(total_final_round)::NUMERIC(10,2) as avg_final_round,
        AVG(total_offers)::NUMERIC(10,2) as avg_offers,
        (AVG(CASE WHEN total_responses > 0 THEN 1.0 ELSE 0.0 END) * 100)::NUMERIC(10,2) as response_rate,
        (AVG(CASE WHEN total_applications > 0 THEN total_first_round::NUMERIC / total_applications ELSE 0 END) * 100)::NUMERIC(10,2) as first_round_rate,
        (AVG(CASE WHEN total_first_round > 0 THEN total_final_round::NUMERIC / total_first_round ELSE 0 END) * 100)::NUMERIC(10,2) as final_round_rate,
        (AVG(CASE WHEN total_final_round > 0 THEN total_offers::NUMERIC / total_final_round ELSE 0 END) * 100)::NUMERIC(10,2) as offer_rate
      FROM survey_responses
      ${whereClause}
    `;

    const { rows } = await sql.query(queryText, values);
    const row = rows[0];

    return {
      total_survey_count: parseInt(row.total_survey_count) || 0,
      avg_applications: parseFloat(row.avg_applications) || 0,
      avg_responses: parseFloat(row.avg_responses) || 0,
      avg_first_round: parseFloat(row.avg_first_round) || 0,
      avg_final_round: parseFloat(row.avg_final_round) || 0,
      avg_offers: parseFloat(row.avg_offers) || 0,
      response_rate: parseFloat(row.response_rate) || 0,
      first_round_rate: parseFloat(row.first_round_rate) || 0,
      final_round_rate: parseFloat(row.final_round_rate) || 0,
      offer_rate: parseFloat(row.offer_rate) || 0,
    };
  } catch (error) {
    console.error('Error calculating aggregated stats:', error);
    throw error;
  }
}

/**
 * Insert a new survey response
 */
export async function insertSurveyResponse(
  response: Omit<SurveyResponse, 'id' | 'timestamp'>
): Promise<SurveyResponse> {
  try {
    const { rows } = await sql`
      INSERT INTO survey_responses (
        total_applications,
        total_responses,
        total_first_round,
        total_final_round,
        total_offers,
        major,
        degree,
        school_tier,
        gpa_range,
        graduating_time,
        internship_count,
        has_return_offer,
        needs_sponsorship,
        when_started_applying
      ) VALUES (
        ${response.total_applications},
        ${response.total_responses},
        ${response.total_first_round},
        ${response.total_final_round},
        ${response.total_offers},
        ${response.major},
        ${response.degree},
        ${response.school_tier},
        ${response.gpa_range},
        ${response.graduating_time},
        ${response.internship_count},
        ${response.has_return_offer},
        ${response.needs_sponsorship},
        ${response.when_started_applying}
      )
      RETURNING *
    `;

    const row = rows[0];
    return {
      id: row.id.toString(),
      total_applications: row.total_applications,
      total_responses: row.total_responses,
      total_first_round: row.total_first_round,
      total_final_round: row.total_final_round,
      total_offers: row.total_offers,
      major: row.major,
      degree: row.degree,
      school_tier: row.school_tier,
      gpa_range: row.gpa_range,
      graduating_time: row.graduating_time,
      internship_count: row.internship_count,
      has_return_offer: row.has_return_offer,
      needs_sponsorship: row.needs_sponsorship,
      when_started_applying: row.when_started_applying,
      timestamp: new Date(row.timestamp),
    };
  } catch (error) {
    console.error('Error inserting survey response:', error);
    throw error;
  }
}

/**
 * Get unique values for filter options
 */
export async function getFilterOptions() {
  try {
    const [majors, degrees, schoolTiers, gpaRanges, graduatingTimes, whenStartedApplying] = await Promise.all([
      sql`SELECT DISTINCT major FROM survey_responses ORDER BY major`,
      sql`SELECT DISTINCT degree FROM survey_responses ORDER BY degree`,
      sql`SELECT DISTINCT school_tier FROM survey_responses ORDER BY school_tier`,
      sql`SELECT DISTINCT gpa_range FROM survey_responses ORDER BY gpa_range`,
      sql`SELECT DISTINCT graduating_time FROM survey_responses ORDER BY graduating_time`,
      sql`SELECT DISTINCT when_started_applying FROM survey_responses ORDER BY when_started_applying`,
    ]);

    return {
      majors: majors.rows.map((r: any) => r.major),
      degrees: degrees.rows.map((r: any) => r.degree),
      schoolTiers: schoolTiers.rows.map((r: any) => r.school_tier),
      gpaRanges: gpaRanges.rows.map((r: any) => r.gpa_range),
      graduatingTimes: graduatingTimes.rows.map((r: any) => r.graduating_time),
      whenStartedApplying: whenStartedApplying.rows.map((r: any) => r.when_started_applying),
    };
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
}
