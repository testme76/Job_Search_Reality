-- Vercel Postgres Database Schema for Job Search Reality

-- Survey responses table
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
  degree VARCHAR(50) NOT NULL, -- e.g., "Bachelor's", "Master's", "PhD"
  school_tier VARCHAR(50) NOT NULL, -- e.g., "Target", "Reach", "Safety"
  gpa_range VARCHAR(20) NOT NULL, -- e.g., "3.5-3.7", "3.7-4.0"
  graduating_time VARCHAR(50) NOT NULL, -- e.g., "May 2024", "December 2024"

  -- Experience
  internship_count INTEGER NOT NULL,
  has_return_offer BOOLEAN NOT NULL,

  -- Job search details
  needs_sponsorship BOOLEAN NOT NULL,
  when_started_applying VARCHAR(50) NOT NULL, -- e.g., "August 2023", "3 months before graduation"

  -- Metadata
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_major ON survey_responses(major);
CREATE INDEX IF NOT EXISTS idx_degree ON survey_responses(degree);
CREATE INDEX IF NOT EXISTS idx_school_tier ON survey_responses(school_tier);
CREATE INDEX IF NOT EXISTS idx_needs_sponsorship ON survey_responses(needs_sponsorship);
CREATE INDEX IF NOT EXISTS idx_has_return_offer ON survey_responses(has_return_offer);
CREATE INDEX IF NOT EXISTS idx_gpa_range ON survey_responses(gpa_range);
CREATE INDEX IF NOT EXISTS idx_timestamp ON survey_responses(timestamp DESC);

-- Optional: Create a view for common aggregations
CREATE OR REPLACE VIEW stats_summary AS
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
FROM survey_responses;
