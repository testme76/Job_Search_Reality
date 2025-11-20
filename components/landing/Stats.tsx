"use client";

import { useState, useEffect } from "react";
import { calculateStats } from "@/lib/utils";

export default function Stats() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/responses");
        const json = await response.json();
        const calculatedStats = calculateStats(json.data || []);
        setStats(calculatedStats);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const displayStats = stats
    ? [
        {
          label: "Survey Responses",
          value: stats.total_responses.toLocaleString(),
          description: "Real people, real data",
        },
        {
          label: "Average Applications Sent",
          value: Math.round(stats.avg_applications).toLocaleString(),
          description: "You're not alone",
        },
        {
          label: "Average Response Rate",
          value: `${stats.response_rate.toFixed(1)}%`,
          description: "That's the reality",
        },
        {
          label: "Average Offers",
          value: stats.avg_offers.toFixed(1),
          description: "It's a numbers game",
        },
      ]
    : [];

  if (loading) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            The Numbers Don't Lie
          </h2>
          <div className="text-center text-gray-500">Loading stats...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          The Numbers Don't Lie
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat) => (
            <div
              key={stat.label}
              className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg border border-gray-100 dark:border-gray-700 md:hover:shadow-xl md:hover:border-blue-200 md:dark:hover:border-blue-800 md:hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className="relative">
                <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-wide uppercase">
                  {stat.label}
                </p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
