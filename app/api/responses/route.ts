import { NextResponse } from "next/server";
import { getSurveyResponses } from "@/lib/db/postgres";
import type { DashboardFilters } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse filters from query params
    const filters: DashboardFilters = {};

    const major = searchParams.get("major");
    if (major) filters.major = major;

    const degree = searchParams.get("degree");
    if (degree) filters.degree = degree;

    const schoolTier = searchParams.get("school_tier");
    if (schoolTier) filters.school_tier = schoolTier;

    const gpaRange = searchParams.get("gpa_range");
    if (gpaRange) filters.gpa_range = gpaRange;

    const graduatingTime = searchParams.get("graduating_time");
    if (graduatingTime) filters.graduating_time = graduatingTime;

    const whenStartedApplying = searchParams.get("when_started_applying");
    if (whenStartedApplying) filters.when_started_applying = whenStartedApplying;

    const needsSponsorship = searchParams.get("needs_sponsorship");
    if (needsSponsorship !== null) filters.needs_sponsorship = needsSponsorship;

    const hasReturnOffer = searchParams.get("has_return_offer");
    if (hasReturnOffer !== null) filters.has_return_offer = hasReturnOffer;

    // Fetch filtered data from Postgres
    const data = await getSurveyResponses(filters);

    return NextResponse.json({ data, count: data.length });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch data", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
