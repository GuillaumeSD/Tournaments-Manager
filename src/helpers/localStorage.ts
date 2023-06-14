import { Dispatch, SetStateAction, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // Prevent build error "window is undefined"
  if (typeof window === "undefined") {
    return [initialValue, () => {}];
  }

  const item = window.localStorage.getItem(key);
  const initValue = item ? parseJSON<T>(item) : initialValue;

  const [storedValue, setStoredValue] = useState<T>(initValue);

  const setValue: SetValue<T> = (value) => {
    const newValue = value instanceof Function ? value(storedValue) : value;
    window.localStorage.setItem(key, JSON.stringify(newValue));
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
}

function parseJSON<T>(value: string): T {
  return value === "undefined" ? undefined : JSON.parse(value);
}
