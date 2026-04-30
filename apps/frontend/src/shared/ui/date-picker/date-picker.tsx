import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { format } from "date-fns";
import { DayPicker, type Matcher } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./calendar-theme.css";

type DatePickerProps = {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  minDate?: string;
  maxDate?: string;
};

export function DatePicker({ value, label, onChange, minDate, maxDate }: DatePickerProps) {
  const selectedDate = value
    ? new Date(value + "T00:00:00")
    : undefined;

  const displayLabel = label ?? "Select date";
  const min = minDate ? new Date(minDate + "T00:00:00") : undefined;
  const max = maxDate ? new Date(maxDate + "T00:00:00") : undefined;
  const disabled: Matcher[] = [];

  if (min) {
    disabled.push({ before: min });
  }

  if (max) {
    disabled.push({ after: max });
  }

  return (
    <Popover className="relative">
      <PopoverButton
        className="
          px-3 py-2 rounded-lg
          border border-theme
          bg-card text-primary
          min-w-35
          hover:bg-secondary
          transition-colors
          cursor-pointer
        "
      >
        {selectedDate ? format(selectedDate, "dd/MM/yyyy") : displayLabel}
      </PopoverButton>

      <PopoverPanel
        className="
          absolute z-20 mt-2
          bg-card
          p-3 rounded-xl shadow-lg
          border border-theme
        "
      >
        <DayPicker
          mode="single"
          selected={selectedDate}
          disabled={disabled}
          onSelect={(date) => {
            if (!date) return;
            onChange(format(date, "yyyy-MM-dd"));
          }}
        />
      </PopoverPanel>
    </Popover>
  );
}