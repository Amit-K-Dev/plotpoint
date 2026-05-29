"use client";

import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS, MAX_HISTORY } from "@/lib/constants";

export function useHistory() {
  const [history, setHistory] = useLocalStorage(
    STORAGE_KEYS.history,
    []
  );

  const addEntry = (entry) => {
    setHistory((prev) =>
      [
        {
          ...entry,
          id: Date.now(),
          createdAt: Date.now(),
        },
        ...prev,
      ].slice(0, MAX_HISTORY)
    );
  };

  const removeEntry = (id) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
  };

  const clearAll = () => {
    setHistory([]);
  };

  return {
    history,
    addEntry,
    removeEntry,
    clearAll,
  };
}