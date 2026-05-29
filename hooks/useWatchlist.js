"use client";

import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/constants";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useLocalStorage(
    STORAGE_KEYS.watchlist,
    []
  );

  const addEntry = (entry) => {
    if (watchlist.find((w) => w.title === entry.title)) {
      return false;
    }

    setWatchlist((prev) => [
      {
        ...entry,
        id: Date.now(),
        addedAt: Date.now(),
        status: "Want to Watch",
      },
      ...prev,
    ]);

    return true;
  };

  const updateStatus = (id, status) => {
    setWatchlist((prev) =>
      prev.map((w) =>
        w.id === id
          ? { ...w, status }
          : w
      )
    );
  };

  const removeEntry = (id) => {
    setWatchlist((prev) =>
      prev.filter((w) => w.id !== id)
    );
  };

  const isInWatchlist = (title) => {
    return watchlist.some((w) => w.title === title);
  };

  return {
    watchlist,
    addEntry,
    updateStatus,
    removeEntry,
    isInWatchlist,
  };
}