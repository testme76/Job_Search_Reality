import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateStats(data: any[]) {
  if (data.length === 0) return null;

  const total = data.length;
  const avgApps = data.reduce((sum, r) => sum + r.total_applications, 0) / total;
  const avgResponses = data.reduce((sum, r) => sum + r.total_responses, 0) / total;
  const avgFirstRound = data.reduce((sum, r) => sum + r.total_first_round, 0) / total;
  const avgFinalRound = data.reduce((sum, r) => sum + r.total_final_round, 0) / total;
  const avgOffers = data.reduce((sum, r) => sum + r.total_offers, 0) / total;

  return {
    total_responses: total,
    avg_applications: Math.round(avgApps),
    avg_interviews: Math.round(avgFirstRound * 10) / 10,
    avg_offers: Math.round(avgOffers * 10) / 10,
    response_rate: Math.round((avgResponses / avgApps) * 100 * 10) / 10,
    interview_rate: Math.round((avgFirstRound / avgApps) * 100 * 10) / 10,
    offer_rate: Math.round((avgOffers / avgApps) * 100 * 10) / 10,
  };
}
