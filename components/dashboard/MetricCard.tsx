import { Card, CardContent } from "@/components/ui/Card";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
}

export default function MetricCard({ title, value, subtitle, trend }: MetricCardProps) {
  const trendColors = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-gray-600 dark:text-gray-400",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-3xl font-bold mb-1">{value}</p>
        {subtitle && (
          <p className={`text-xs ${trend ? trendColors[trend] : "text-gray-500 dark:text-gray-400"}`}>
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
