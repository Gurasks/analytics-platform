import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

export function useQueryState<T extends string>(
  key: string,
  defaultValue: T,
): [T, (val: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => {
    const param = searchParams.get(key);
    return (param as T) || defaultValue;
  }, [searchParams, key, defaultValue]);

  const setValue = useCallback(
    (val: T) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (!val || val === defaultValue) {
          next.delete(key);
        } else {
          next.set(key, val);
        }
        return next;
      });
    },
    [key, defaultValue, setSearchParams],
  );

  return [value, setValue];
}
