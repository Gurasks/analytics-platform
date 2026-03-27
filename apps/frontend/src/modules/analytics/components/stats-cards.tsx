import type { GetStatsResponse } from "@analytics/shared-types";

type StatsCardsProps = {
  data: GetStatsResponse | undefined;
};

export function StatsCards({ data }: StatsCardsProps) {
  const total = data?.eventStats.reduce((acc, item) => acc + item.count, 0) ?? 0;

  return (
    <div className="bg-card rounded-2xl shadow-md hover:shadow-xl transition p-4 border border-theme">
      <p className="text-secondary">Total Events</p>
      <h2 className="text-2xl font-bold text-primary">
        {total}
      </h2>
    </div>
  );
}