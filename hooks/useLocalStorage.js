"use client";

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);

      if (item !== null) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`useLocalStorage: failed to read key "${key}"`, error);
    }

    setIsHydrated(true);
  }, [key]);

  const setValue = (value) => {
    try {
      const valueToStore =
        typeof value === "function"
          ? value(storedValue)
          : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(
        key,
        JSON.stringify(valueToStore)
      );
    } catch (error) {
      console.warn(`useLocalStorage: failed to write key "${key}"`, error);
    }
  };

  return [storedValue, setValue, isHydrated];
}