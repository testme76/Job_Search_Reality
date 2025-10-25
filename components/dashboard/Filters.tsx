"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import type { DashboardFilters } from "@/lib/types";

interface FiltersProps {
  onFiltersChange: (filters: DashboardFilters) => void;
}

export default function Filters({ onFiltersChange }: FiltersProps) {
  const [filters, setFilters] = useState<DashboardFilters>({});

  const handleFilterChange = (key: keyof DashboardFilters, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === "" ? undefined : value,
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Major</label>
            <Select
              value={filters.major || ""}
              onChange={(value) => handleFilterChange("major", value)}
              options={[
                { value: "Computer Science", label: "Computer Science" },
                { value: "Software Engineering", label: "Software Engineering" },
                { value: "Data Science", label: "Data Science" },
                { value: "Information Systems", label: "Information Systems" },
                { value: "Computer Engineering", label: "Computer Engineering" },
                { value: "Other", label: "Other" },
              ]}
              placeholder="All Majors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Degree</label>
            <Select
              value={filters.degree || ""}
              onChange={(value) => handleFilterChange("degree", value)}
              options={[
                { value: "Bachelor's degree", label: "Bachelor's" },
                { value: "Master's degree (came straight from undergrad)", label: "Master's (straight)" },
                { value: "Master's degree (worked full-time before grad school)", label: "Master's (worked)" },
                { value: "PhD / Currently pursuing PhD", label: "PhD" },
                { value: "Bootcamp graduate", label: "Bootcamp" },
                { value: "Self-taught / No degree", label: "Self-taught" },
              ]}
              placeholder="All Degrees"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">School Tier</label>
            <Select
              value={filters.school_tier || ""}
              onChange={(value) => handleFilterChange("school_tier", value)}
              options={[
                { value: "Top 10 CS (MIT, Stanford, CMU, Berkeley, etc.)", label: "Top 10 CS" },
                { value: "Top 25 CS (UIUC, Georgia Tech, UT Austin, Cornell, etc.)", label: "Top 25 CS" },
                { value: "Top 50 CS / Strong state flagship", label: "Top 50 CS" },
                { value: "Regional state university / mid-tier private", label: "Regional/Mid-tier" },
                { value: "International university (non-US)", label: "International" },
                { value: "Attended bootcamp / self-taught / non-traditional", label: "Bootcamp/Self-taught" },
              ]}
              placeholder="All Schools"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Internships</label>
            <Select
              value={filters.internship_count?.toString() || ""}
              onChange={(value) => handleFilterChange("internship_count", value)}
              options={[
                { value: "0", label: "0 internships" },
                { value: "1", label: "1 internship" },
                { value: "2", label: "2 internships" },
                { value: "3", label: "3+ internships" },
              ]}
              placeholder="All"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Return Offer</label>
            <Select
              value={filters.has_return_offer || ""}
              onChange={(value) => handleFilterChange("has_return_offer", value)}
              options={[
                { value: "Yes, but I'm still searching for other opportunities", label: "Yes, still searching" },
                { value: "Yes, but it was rescinded or withdrawn", label: "Yes, rescinded" },
                { value: "No, I don't have a return offer", label: "No return offer" },
              ]}
              placeholder="All"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sponsorship</label>
            <Select
              value={filters.needs_sponsorship || ""}
              onChange={(value) => handleFilterChange("needs_sponsorship", value)}
              options={[
                { value: "Yes, I need sponsorship", label: "Need sponsorship" },
                { value: "No, US citizen", label: "US citizen" },
                { value: "No, permanent resident", label: "Permanent resident" },
              ]}
              placeholder="All"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Graduating Time</label>
            <Select
              value={filters.graduating_time || ""}
              onChange={(value) => handleFilterChange("graduating_time", value)}
              options={[
                { value: "Already graduated (2024 or earlier)", label: "2024 or earlier" },
                { value: "Spring 2025 (May 2025)", label: "Spring 2025" },
                { value: "Fall 2025 (Dec 2025)", label: "Fall 2025" },
                { value: "Spring 2026 (May 2026)", label: "Spring 2026" },
                { value: "Fall 2026 (Dec 2026)", label: "Fall 2026" },
                { value: "2027 or later", label: "2027+" },
              ]}
              placeholder="All Graduation Times"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">GPA Range</label>
            <Select
              value={filters.gpa_range || ""}
              onChange={(value) => handleFilterChange("gpa_range", value)}
              options={[
                { value: "3.85 - 4.0", label: "3.85 - 4.0" },
                { value: "3.7-3.84", label: "3.7 - 3.84" },
                { value: "3.3 - 3.69", label: "3.3 - 3.69" },
                { value: "3.0 - 3.29", label: "3.0 - 3.29" },
                { value: "Below 3.0", label: "Below 3.0" },
              ]}
              placeholder="All GPAs"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">When Started Applying</label>
            <Select
              value={filters.when_started_applying || ""}
              onChange={(value) => handleFilterChange("when_started_applying", value)}
              options={[
                { value: "Before August 2024", label: "Before Aug 2024" },
                { value: "August - December 2024", label: "Aug - Dec 2024" },
                { value: "January 2025 - May 2025", label: "Jan - May 2025" },
                { value: "May 2025 - August 2025", label: "May - Aug 2025" },
                { value: "August 2025 or Later", label: "Aug 2025+" },
                { value: "Haven't started yet", label: "Not started" },
              ]}
              placeholder="All Times"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
