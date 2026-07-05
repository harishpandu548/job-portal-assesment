"use client";

import { useCallback, useSyncExternalStore, useMemo } from "react";

const STORAGE_KEY = "jobnest_saved_jobs";

function getSavedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function setSavedIds(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event("savedJobsChanged"));
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("savedJobsChanged", callback);
  return () => window.removeEventListener("savedJobsChanged", callback);
}

function getSnapshot() {
  if (typeof window === "undefined") return "[]";
  return localStorage.getItem(STORAGE_KEY) || "[]";
}

function getServerSnapshot() {
  return "[]";
}

export function useSavedJobs(jobId?: string) {
  const storeString = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  
  const savedIds = useMemo(() => {
    try {
      return JSON.parse(storeString) as string[];
    } catch {
      return [];
    }
  }, [storeString]);

  const isSaved = jobId ? savedIds.includes(jobId) : false;

  const toggle = useCallback(() => {
    if (!jobId) return;
    const current = getSavedIds();
    const updated = current.includes(jobId)
      ? current.filter((id) => id !== jobId)
      : [...current, jobId];
    setSavedIds(updated);
  }, [jobId]);

  const removeSaved = useCallback((id: string) => {
    const updated = getSavedIds().filter((s) => s !== id);
    setSavedIds(updated);
  }, []);

  return { isSaved, toggle, savedIds, removeSaved };
}
