type Props = {
  data?: GetStatsResponse;
  groupBy: string;
};

import type { GetStatsResponse } from "@analytics/shared-types";
import { VisxBarChart } from "./visx-bar-chart";
import { VisxLineChart } from "./visx-line-chart";

export function EventsChart({ data, groupBy }: Props) {
  if (!data) return <p>Loading...</p>;

  const chartData = data.eventStats;

  return (
    <div className="rounded-xl bg-card p-4">
      {groupBy === "DAY" ? (
        <VisxLineChart data={[...chartData].reverse()} />
      ) : (
        <VisxBarChart data={chartData} />
      )}
    </div>
  );
}