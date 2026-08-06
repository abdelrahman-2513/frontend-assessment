"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ActivityLog, ErrorResponse } from "@/types/api";

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    try {
      const body = (await response.json()) as ErrorResponse;
      throw new Error(body.error?.message || `Request failed with ${response.status}`);
    } catch (error) {
      throw new Error(getErrorMessage(error, `Request failed with ${response.status}`));
    }
  }

  return (await response.json()) as T;
}

export function useActivity() {
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchActivity = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const logs = await requestJson<ActivityLog[]>("/api/activity", {
        method: "GET",
      });

      setActivity(Array.isArray(logs) ? logs : []);
    } catch (err) {
      setError(getErrorMessage(err, "Could not load activity right now."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const filteredActivity = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) {
      return activity;
    }

    return activity.filter(
      (item) =>
        (item.action || "").toLowerCase().includes(trimmed) ||
        (item.info || "").toLowerCase().includes(trimmed)
    );
  }, [activity, query]);

  return {
    activity,
    filteredActivity,
    query,
    setQuery,
    loading,
    error,
    fetchActivity,
  };
}
