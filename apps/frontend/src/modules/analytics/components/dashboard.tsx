import { StatsCards } from "./stats-cards";
import { EventsByTypeChart } from "./events-by-type-chart";
import { useGetStats } from "../hooks/use-get-stats";

export function Dashboard() {
  const { data, loading, error } = useGetStats();

  if (!data && loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Analytics Dashboard</h1>

      <StatsCards data={data} />

      <div style={{ marginTop: "40px" }}>
        <h2>Events by Type</h2>
        <EventsByTypeChart data={data} />
      </div>
    </div>
  );
}