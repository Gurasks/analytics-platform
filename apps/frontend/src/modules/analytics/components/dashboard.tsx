import { StatsCards } from "./stats-cards";
import { useGetStats } from "../hooks/use-get-stats";
import { useState } from "react";
import type { EventGroupBy } from "../types/event.type";
import { Filters } from "./filters";
import { EventsChart } from "./chart";

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
    <div style={{ padding: 20 }}>
      <h1>Analytics Dashboard</h1>

      <Filters
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <StatsCards data={data} />
      <EventsChart data={data} groupBy={groupBy} />
    </div>
  );
}