import { DatePicker } from "@/shared/ui/date-picker/date-picker";
import { SearchCombobox } from "@/shared/ui/search-combobox/search-combobox";
import { Select } from "@/shared/ui/select/select";
import type { GetStatsResponse } from "@analytics/shared-types";
import { format } from "date-fns";
import { useMemo } from "react";
import type { EventGroupBy } from "../types/event.type";

type FilterProps = {
  groupBy: EventGroupBy;
  setGroupBy: (value: EventGroupBy) => void;
  fromDate: string;
  setFromDate: (value: string) => void;
  toDate: string;
  setToDate: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
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
  data,
  onClear
}: FilterProps) {
  const options = useMemo(
    () => data?.eventStats.map((s) => s.key) ?? [],
    [data]
  );

  const hasFilters =
    groupBy !== "TYPE" ||
    !!fromDate ||
    !!toDate ||
    !!search;

  const today = format(new Date(), "yyyy-MM-dd");

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

      <DatePicker
        value={fromDate}
        onChange={setFromDate}
        label="Select From Date"
        maxDate={toDate || today}
      />
      <DatePicker
        value={toDate}
        onChange={setToDate}
        label="Select To Date"
        minDate={fromDate}
        maxDate={today}
      />
      {groupBy === "USER" && (
        <SearchCombobox
          value={search}
          onChange={setSearch}
          onSubmit={(value) => {
            setSearch(value);
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