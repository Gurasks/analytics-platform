import { EventsChart } from "@/modules/analytics/components/events-chart";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { ThemeToggle } from "@/shared/ui/theme-toggle/theme-toggle";
import { useSearchParams } from "react-router-dom";
import { QUERY_KEYS } from "../constants/query-keys";
import { useGetStats } from "../hooks/use-get-stats";
import { type EventGroupBy } from "../types/event.type";
import { Filters } from "./filters";
import { StatsCards } from "./stats-cards";
import { useQueryState } from "@/shared/hooks/use-query-params";

export function Dashboard() {
  const [, setSearchParams] = useSearchParams();

  const [groupBy, setGroupBy] = useQueryState<EventGroupBy>(
    QUERY_KEYS.groupBy,
    "TYPE"
  );
  const [fromDate, setFromDate] = useQueryState<string>(
    QUERY_KEYS.from,
    ""
  );
  const [toDate, setToDate] = useQueryState<string>(
    QUERY_KEYS.to,
    ""
  );
  const [search, setSearch] = useQueryState<string>(
    QUERY_KEYS.search,
    ""
  );

  // Single source of truth + debounce
  const debouncedSearch = useDebounce(search, 400);

  const { data, loading, error } = useGetStats({
    groupBy,
    fromDate,
    toDate,
    search: debouncedSearch,
  });

  if (!data && loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const clearFilters = () => {
    setSearchParams({
      [QUERY_KEYS.groupBy]: "TYPE",
    });
  };

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
            search={search}
            setSearch={setSearch}
            data={data}
            onClear={clearFilters}
          />
        </div>

        <StatsCards data={data} />

        <div className="mt-6 bg-card rounded-2xl p-6 shadow-lg border border-theme">
          <h2 className="text-lg font-semibold mb-4 text-primary">
            Events
          </h2>
          <EventsChart data={data} groupBy={groupBy} />
        </div>
      </div>
    </div>
  );
}