"use client";

import { motion } from "framer-motion";
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
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent"
        >
          The Numbers Don't Lie
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <p className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-wide uppercase">
                  {stat.label}
                </p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
