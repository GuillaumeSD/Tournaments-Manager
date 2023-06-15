import { useLocalStorage } from "./localStorage";
import { v4 as uuid } from "uuid";

export function createDatabase<T extends { id: string }>(
  localStorageKey: string
): {
  elements: Record<string, T | undefined>;
  add: (element: Omit<T, "id">) => void;
  set: (element: T) => void;
  remove: (elementId: string) => void;
  reset: () => void;
} {
  const [elements, setElements] = useLocalStorage<
    Record<string, T | undefined>
  >(localStorageKey, {});

  const set = (element: T) => {
    setElements((prev) => {
      prev[element.id] = element;
      return prev;
    });
  };

  const add = (element: Omit<T, "id">) => {
    const newElement = { ...element, id: uuid() } as T;
    set(newElement);
  };

  const remove = (elementId: string) => {
    setElements((prev) => {
      const { [elementId]: _, ...rest } = prev;
      return rest;
    });
  };

  const reset = () => {
    setElements({});
  };

  return {
    elements,
    add,
    set,
    remove,
    reset,
  };
}
