import { useThemeColors } from "@/shared/theme";
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
  CartesianGrid,
} from "recharts";

type EventsChartProps = {
  data?: GetStatsResponse;
  groupBy: string;
};

export function EventsChart({ data, groupBy }: EventsChartProps) {
  if (!data) return <p>Loading...</p>;

  const {
    accent: color,
    accentHover: hoverColor,
    bgCard: tooltipBg,
    textPrimary,
    textSecondary: axisColor,
    border: gridColor,
  } = useThemeColors();

  const chartData = data.eventStats.slice(0, 10);

  return (
    <div
      key={groupBy}
      style={{ width: "100%", height: 300 }}
      className="rounded-xl bg-card p-4"
    >
      <ResponsiveContainer width="100%" height="100%">
        {groupBy === "DAY" ? (
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="key"
              stroke={axisColor}
              tick={{ fill: textPrimary, fontSize: 12 }}
            />
            <YAxis
              stroke={axisColor}
              tick={{ fill: textPrimary, fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${gridColor}`,
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              labelStyle={{
                color: textPrimary,
                fontWeight: "bold",
                marginBottom: "4px",
              }}
              itemStyle={{
                color: textPrimary,
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke={color}
              strokeWidth={3}
              dot={{
                r: 4,
                fill: color,
                strokeWidth: 2,
                stroke: tooltipBg,
              }}
              activeDot={{
                r: 8,
                fill: hoverColor,
                stroke: color,
                strokeWidth: 2,
              }}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
          </LineChart>
        ) : (
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="key"
              stroke={axisColor}
              tick={{ fill: axisColor, fontSize: 12 }}
            />
            <YAxis
              stroke={axisColor}
              tick={{ fill: axisColor, fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${gridColor}`,
                borderRadius: "8px",
                padding: "8px 12px",
              }}
              labelStyle={{
                color: textPrimary,
                fontWeight: "bold",
                marginBottom: "4px",
              }}
              itemStyle={{
                color: textPrimary,
              }}
              cursor={{
                fill: `${color}1A`, // 10% opacity
                radius: 8,
              }}
            />
            <Bar
              dataKey="count"
              fill={color}
              radius={[8, 8, 0, 0]}
              activeBar={{
                fill: hoverColor,
              }}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridColor}
              vertical={false}
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}