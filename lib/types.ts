export interface SurveyResponse {
  id: string;

  // Application statistics
  total_applications: number;
  total_responses: number;
  total_first_round: number;
  total_final_round: number;
  total_offers: number;

  // Academic background
  major: string;
  degree: string; // "Bachelor's", "Master's", "PhD"
  school_tier: string; // "Target", "Reach", "Safety"
  gpa_range: string; // "3.5-3.7", "3.7-4.0"
  graduating_time: string; // "May 2024", "December 2024"

  // Experience
  internship_count: number;
  has_return_offer: string; // "Yes, but I'm still searching...", "No, I don't have a return offer"

  // Job search details
  needs_sponsorship: string; // "Yes, I need sponsorship", "No, US citizen", "No, permanent resident"
  when_started_applying: string; // "August 2023", "3 months before graduation"

  // Metadata
  timestamp: Date;
}

export interface DashboardFilters {
  major?: string;
  degree?: string;
  school_tier?: string;
  gpa_range?: string;
  internship_count?: string;
  needs_sponsorship?: string;
  has_return_offer?: string;
  graduating_time?: string;
  when_started_applying?: string;
}

export interface AggregatedStats {
  total_survey_count: number;
  avg_applications: number;
  avg_responses: number;
  avg_first_round: number;
  avg_final_round: number;
  avg_offers: number;
  response_rate: number;
  first_round_rate: number;
  final_round_rate: number;
  offer_rate: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}
