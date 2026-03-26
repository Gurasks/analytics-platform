import type { EventGroupBy } from "../types/event.type";

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
    <div style={{ marginBottom: 20 }}>
      <label>Group By: </label>

      <select
        value={groupBy}
        onChange={(e) =>
          setGroupBy(e.target.value as EventGroupBy)
        }
      >
        <option value="TYPE">Type</option>
        <option value="USER">User</option>
        <option value="DAY">Day</option>
      </select>

      <label>Date: </label>

      <input value={fromDate} onChange={(e) => setFromDate(e.target.value)} type="date" />
      <input value={toDate} onChange={(e) => setToDate(e.target.value)} type="date" />
    </div>
  );
}