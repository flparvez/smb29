"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export function useFetchData<T>(url: string, options = { revalidate: false }) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Fetch function with error handling
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(url, {
        headers: { "Cache-Control": options.revalidate ? "no-cache" : "default" },
      });

      if (res.status !== 200) throw new Error("Failed to fetch data");

      setData(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [url, options.revalidate]);

  // 🚀 Fetch on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
