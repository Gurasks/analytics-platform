import type { GetStatsResponse } from "@analytics/shared-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type EventsByTypeChartProps = {
  data: GetStatsResponse | undefined;
};

export function EventsByTypeChart({ data }: EventsByTypeChartProps) {

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data?.eventStats}>
          <XAxis dataKey="key" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}