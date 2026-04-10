import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (input: string) => void;
  options: string[];
};

export function SearchCombobox({ value, onChange, onSubmit, options }: Props) {
  return (
    <Combobox
      value={value}
      onChange={(val) => {
        const next = val ?? "";
        onChange(next);
        onSubmit?.(next);
      }}
    >
      <div className="relative w-56">
        <ComboboxInput
          className="
            w-full px-3 py-2 rounded-lg
            border border-theme
            bg-card text-primary

            focus:outline-none
            focus:ring-2 focus:ring-(--accent-color)
          "
          placeholder="Search user..."
          onChange={(e) => onChange(e.target.value)}
          displayValue={(v: string) => v}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSubmit?.((e.target as HTMLInputElement).value);
            }
          }}
        />

        {value && (
          <ComboboxOptions
            className="
              absolute mt-2 w-full z-10
              bg-card border border-theme rounded-lg
              shadow-lg max-h-60 overflow-auto
            "
          >
            {options.length === 0 ? (
              <div className="px-3 py-2 text-secondary">
                No results
              </div>
            ) : (
              options.map((option) => (
                <ComboboxOption
                  key={option}
                  value={option}
                  className="
                    px-3 py-2 cursor-pointer
                    data-focus:bg-secondary
                    data-selected:text-(--accent-color)
                  "
                >
                  {option}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        )}
      </div>
    </Combobox>
  );
}