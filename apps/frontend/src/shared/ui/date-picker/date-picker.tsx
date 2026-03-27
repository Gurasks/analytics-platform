import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import "./calendar-theme.css";

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export function DatePicker({ value, onChange }: DatePickerProps) {
  const selectedDate = value ? new Date(value) : undefined;

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
        {selectedDate ? format(selectedDate, "dd/MM/yyyy") : "Select date"}
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
          onSelect={(date) => {
            if (!date) return;
            onChange(date.toISOString().slice(0, 10));
          }}
        />
      </PopoverPanel>
    </Popover>
  );
}