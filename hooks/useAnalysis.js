"use client";

import { useState, useCallback } from "react";
import { LOADING_MESSAGES } from "@/lib/constants";

export function useAnalysis() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadMsg, setLoadMsg] = useState("");
  const [error, setError] = useState(null);

  const analyze = useCallback(async (payload) => {
    setError(null);
    setLoading(true);
    setResult(null);

    let mi = 0;

    setLoadMsg(LOADING_MESSAGES[mi]);

    const interval = setInterval(() => {
      mi = (mi + 1) % LOADING_MESSAGES.length;
      setLoadMsg(LOADING_MESSAGES[mi]);
    }, 2200);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Server error ${res.status}`);
      }

      const data = await res.json();

      setResult(data);
      return data;
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Analysis failed";

      setError(msg);
      return null;
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    result,
    loading,
    loadMsg,
    error,
    analyze,
    reset,
  };
}