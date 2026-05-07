"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "templar-codex";

function readFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set<string>(parsed);
  } catch {
    // ignore
  }
  return new Set();
}

function writeToStorage(slugs: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(slugs)));
  } catch {
    // ignore
  }
}

export function useCodex() {
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSaved(readFromStorage());
    setMounted(true);
  }, []);

  function add(slug: string) {
    setSaved((prev) => {
      const next = new Set(prev);
      next.add(slug);
      writeToStorage(next);
      return next;
    });
  }

  function remove(slug: string) {
    setSaved((prev) => {
      const next = new Set(prev);
      next.delete(slug);
      writeToStorage(next);
      return next;
    });
  }

  function toggle(slug: string) {
    if (saved.has(slug)) remove(slug);
    else add(slug);
  }

  function has(slug: string) {
    return saved.has(slug);
  }

  return { saved, add, remove, toggle, has, mounted };
}
