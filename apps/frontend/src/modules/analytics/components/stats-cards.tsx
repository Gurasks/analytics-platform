import type { GetStatsResponse } from "@analytics/shared-types";

type StatsCardsProps = {
  data: GetStatsResponse | undefined;
};

export function StatsCards({ data }: StatsCardsProps) {
  const total = data?.eventStats.reduce((acc, item) => acc + item.count, 0) ?? 0;

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <h3>Total Events</h3>
        <p>{total}</p>
      </div>
    </div>
  );
}