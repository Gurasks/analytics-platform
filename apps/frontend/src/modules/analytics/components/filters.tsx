import { Select } from "@/shared/ui/select/select";
import type { EventGroupBy } from "../types/event.type";
import { DatePicker } from "@/shared/ui/date-picker/date-picker";
import { SearchCombobox } from "@/shared/ui/search-combobox/search-combobox";
import type { GetStatsResponse } from "@analytics/shared-types";
import { useMemo } from "react";

type FilterProps = {
  groupBy: EventGroupBy;
  setGroupBy: (value: EventGroupBy) => void;
  fromDate: string;
  setFromDate: (value: string) => void;
  toDate: string;
  setToDate: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  setActiveSearch: (value: string) => void;
  data?: GetStatsResponse | undefined;
  onClear: () => void;
};

export function Filters({
  groupBy,
  setGroupBy,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  search,
  setSearch,
  setActiveSearch,
  data,
  onClear
}: FilterProps) {
  const options = useMemo(
    () => data?.eventStats.map((s) => s.key) ?? [],
    [data]
  );

  const hasFilters =
    groupBy !== "TYPE" ||
    fromDate ||
    toDate ||
    search;

  return (
    <div className="flex flex-wrap gap-4 items-center transition-all duration-200">
      <Select
        value={groupBy}
        onChange={(val) => setGroupBy(val as EventGroupBy)}
        options={[
          { label: "Type", value: "TYPE" },
          { label: "User", value: "USER" },
          { label: "Day", value: "DAY" },
        ]}
      />

      <DatePicker value={fromDate} onChange={setFromDate} label={"Select From Date"} />
      <DatePicker value={toDate} onChange={setToDate} label={"Select To Date"} />
      {groupBy === "USER" && (
        <SearchCombobox
          value={search}
          onChange={setSearch}
          onSubmit={(value) => {
            setSearch(value);
            setActiveSearch(value);
          }}
          options={options}
        />
      )}

      <button
        onClick={onClear}
        disabled={!hasFilters}
        className="
          px-3 py-2 rounded-lg border border-theme

          disabled:opacity-40
          disabled:cursor-not-allowed
        "
      >
        Clear
      </button>
    </div>
  );
}