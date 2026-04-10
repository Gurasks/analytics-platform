import { useSearchParams } from "react-router-dom";

export function useQueryState<T extends string>(
  key: string,
  defaultValue: T,
  allowedValues?: readonly T[],
) {
  const [params, setParams] = useSearchParams();

  const raw = params.get(key);

  let value = defaultValue;

  if (raw) {
    if (!allowedValues || allowedValues.includes(raw as T)) {
      value = raw as T;
    }
  }

  const setValue = (val: T) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);

      if (val) next.set(key, val);
      else next.delete(key);

      return next;
    });
  };

  return [value, setValue] as const;
}
