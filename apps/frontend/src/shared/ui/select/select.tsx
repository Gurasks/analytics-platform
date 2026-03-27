import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from "@headlessui/react";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

export function Select({ value, onChange, options }: SelectProps) {
  const selected = options.find((o) => o.value === value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-40">
        <ListboxButton
          className="
            w-full px-3 py-2 rounded-lg text-left
            border border-theme
            bg-card text-primary
            hover:bg-secondary
            focus:outline-none
            focus:ring-2 focus:ring-(--accent-color)
            transition-colors
            cursor-pointer
          "
        >
          {selected?.label}
        </ListboxButton>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition duration-75 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <ListboxOptions
            className="
              absolute mt-2 w-full rounded-lg shadow-lg
              border border-theme
              bg-card
              overflow-hidden
              z-10
            "
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="
                  px-3 py-2 cursor-pointer transition-colors
                  text-primary
                  data-focus:bg-secondary
                  data-selected:text-(--accent-color)
                  data-selected:bg-[color-mix(in_srgb,var(--accent-color)_10%,transparent)]
                "
              >
                {option.label}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}