"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

interface ResponseRateChartProps {
  data: { category: string; responseRate: number; interviewRate: number; offerRate: number }[];
}

export default function ResponseRateChart({ data }: ResponseRateChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Success Rates by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="category" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="responseRate" stroke="#3B82F6" name="Response Rate" strokeWidth={2} />
            <Line type="monotone" dataKey="interviewRate" stroke="#10B981" name="Interview Rate" strokeWidth={2} />
            <Line type="monotone" dataKey="offerRate" stroke="#F59E0B" name="Offer Rate" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
