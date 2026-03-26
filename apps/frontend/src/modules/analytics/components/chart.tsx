import type { GetStatsResponse } from "@analytics/shared-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart,
} from "recharts";

type EventsChartProps = {
  data?: GetStatsResponse;
  groupBy: string;
};

export function EventsChart({ data, groupBy }: EventsChartProps) {
  if (!data) return <p>Loading...</p>;

  const chartData = data.eventStats.slice(0, 10);

  return (
    <div key={groupBy} style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        {groupBy === "DAY" ? (
          <LineChart data={chartData}>
            <XAxis dataKey="key" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" />
          </LineChart>
        ) : (
          <BarChart data={chartData}>
            <XAxis dataKey="key" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}