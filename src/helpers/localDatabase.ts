import { useLocalStorage } from "./localStorage";

export function useLocalDatabase<T extends { id: string }>(
  localStorageKey: string
): {
  elements: Record<string, T | undefined>;
  set: (element: T) => void;
  remove: (elementId: string) => void;
  reset: () => void;
} {
  const [elements, setElements] = useLocalStorage<
    Record<string, T | undefined>
  >(localStorageKey, {});

  const set = (element: T) => {
    setElements((prev) => ({ ...prev, [element.id]: element }));
  };

  const remove = (elementId: string) => {
    setElements((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [elementId]: _, ...rest } = prev;
      return rest;
    });
  };

  const reset = () => {
    setElements({});
  };

  return {
    elements,
    set,
    remove,
    reset,
  };
}
