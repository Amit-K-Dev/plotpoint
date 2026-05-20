"use client";

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item));
    } catch {
      console.warn(`useLocalStorage: failed to read key "${key}"`);
    }
    setIsHydrated(true);
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch {
      console.warn(`useLocalStorage: failed to write key "${key}"`);
    }
  };

  return [storedValue, setValue, isHydrated] as const;
}
