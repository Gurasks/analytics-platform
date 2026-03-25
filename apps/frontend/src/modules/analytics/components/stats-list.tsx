import { useGetStats } from "../hooks/use-get-stats";

export function StatsList() {
  const { data, loading, error, networkStatus } = useGetStats();

  if (!data && loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Events by Type</h2>

      {networkStatus === 4 && <p>Refreshing...</p>}

      <ul>
        {data?.eventStats.map((item) => (
          <li key={item.key}>
            {item.key}: {item.count}
          </li>
        ))}
      </ul>
    </div>
  );
}