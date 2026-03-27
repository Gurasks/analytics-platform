import { StatsCards } from "./stats-cards";
import { useGetStats } from "../hooks/use-get-stats";
import { useState } from "react";
import type { EventGroupBy } from "../types/event.type";
import { Filters } from "./filters";
import { EventsChart } from "./chart";
import { ThemeToggle } from "@/shared/ui/theme-toggle/theme-toggle";

export function Dashboard() {
  const [groupBy, setGroupBy] = useState<EventGroupBy>("TYPE");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const { data, loading, error } = useGetStats({
    groupBy,
    fromDate,
    toDate,
  });

  if (!data && loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="min-h-screen bg-primary text-primary p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

        <ThemeToggle />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Filters
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />
        </div>

        <StatsCards data={data} />

        <div className="mt-6 bg-card rounded-2xl p-6 shadow-lg border border-theme">
          <h2 className="text-lg font-semibold mb-4 text-primary">Events</h2>
          <EventsChart data={data} groupBy={groupBy} />
        </div>
      </div>
    </div>
  );
}