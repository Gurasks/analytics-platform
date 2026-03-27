import { Select } from "@/shared/ui/select/select";
import type { EventGroupBy } from "../types/event.type";
import { DatePicker } from "@/shared/ui/date-picker/date-picker";

type FilterProps = {
  groupBy: EventGroupBy;
  setGroupBy: (value: EventGroupBy) => void;
  fromDate: string;
  setFromDate: (value: string) => void;
  toDate: string;
  setToDate: (value: string) => void;
};

export function Filters({
  groupBy,
  setGroupBy,
  fromDate,
  setFromDate,
  toDate,
  setToDate
}: FilterProps) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Select
        value={groupBy}
        onChange={(val) => setGroupBy(val as EventGroupBy)}
        options={[
          { label: "Type", value: "TYPE" },
          { label: "User", value: "USER" },
          { label: "Day", value: "DAY" },
        ]}
      />

      <DatePicker value={fromDate} onChange={setFromDate} />
      <DatePicker value={toDate} onChange={setToDate} />
    </div>
  );
}