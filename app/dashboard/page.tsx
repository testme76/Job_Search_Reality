"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";
import Filters from "@/components/dashboard/Filters";
import MetricCard from "@/components/dashboard/MetricCard";
import ApplicationsChart from "@/components/dashboard/ApplicationsChart";
import ResponseRateChart from "@/components/dashboard/ResponseRateChart";
import type { DashboardFilters, SurveyResponse } from "@/lib/types";
import { calculateStats } from "@/lib/utils";

export default function Dashboard() {
  const [filters, setFilters] = useState<DashboardFilters>({});
  const [data, setData] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/responses?${params.toString()}`);
      const json = await response.json();
      setData(json.data || []);
      setLoading(false);
    }

    fetchData();
  }, [filters]);

  const stats = calculateStats(data);

  // Prepare chart data
  const applicationRanges = [
    { range: "0-50", count: data.filter(r => r.total_applications < 50).length },
    { range: "50-100", count: data.filter(r => r.total_applications >= 50 && r.total_applications < 100).length },
    { range: "100-200", count: data.filter(r => r.total_applications >= 100 && r.total_applications < 200).length },
    { range: "200-300", count: data.filter(r => r.total_applications >= 200 && r.total_applications < 300).length },
    { range: "300-500", count: data.filter(r => r.total_applications >= 300 && r.total_applications < 500).length },
    { range: "500+", count: data.filter(r => r.total_applications >= 500).length },
  ];

  const mockRateData = [
    { category: "Week 1", responseRate: 5.2, interviewRate: 3.1, offerRate: 0.8 },
    { category: "Week 2", responseRate: 4.8, interviewRate: 2.9, offerRate: 0.9 },
    { category: "Week 3", responseRate: 3.5, interviewRate: 2.2, offerRate: 0.7 },
    { category: "Week 4", responseRate: 3.2, interviewRate: 1.9, offerRate: 0.5 },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Nav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Job Search Dashboard</h1>

        <div className="mb-8">
          <Filters onFiltersChange={setFilters} />
        </div>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-500">Loading data...</p>
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <MetricCard
                title="Total Responses"
                value={stats.total_responses}
                subtitle="Sample size"
              />
              <MetricCard
                title="Avg Applications"
                value={stats.avg_applications}
                subtitle="Per candidate"
              />
              <MetricCard
                title="Avg Interviews"
                value={stats.avg_interviews}
                subtitle={`${stats.response_rate}% response rate`}
              />
              <MetricCard
                title="Avg Offers"
                value={stats.avg_offers}
                subtitle={`${stats.offer_rate}% success rate`}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ApplicationsChart data={applicationRanges} />
              <ResponseRateChart data={mockRateData} />
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">No data available for selected filters</p>
          </div>
        )}
      </div>
    </main>
  );
}
