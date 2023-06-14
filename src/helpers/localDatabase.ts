import { useLocalStorage } from "./localStorage";

export function createDatabase<T extends { id: number }>(
  localStorageKey: string
): {
  elements: T[];
  add: (el: Omit<T, "id">) => void;
  set: (el: T) => void;
  remove: (playerId: number) => void;
  reset: () => void;
} {
  const [elements, setElements] = useLocalStorage<T[]>(localStorageKey, []);

  const add = (element: Omit<T, "id">) => {
    setElements((prev) => [...prev, { ...element, id: prev.length } as T]);
  };

  const set = (element: T) => {
    setElements((prev) => {
      prev[element.id] = element;
      return prev;
    });
  };

  const remove = (elementId: number) => {
    setElements((prev) => {
      prev.splice(elementId, 1);
      return prev.map((el, i) => ({ ...el, id: i }));
    });
  };

  const reset = () => {
    setElements([]);
  };

  return {
    elements,
    add,
    set,
    remove,
    reset,
  };
}
