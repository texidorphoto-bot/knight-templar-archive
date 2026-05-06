"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type IssueSearchProps = {
  /** Current value of the search input from the URL. */
  initialValue?: string;
  /** Called when the user submits a new search query. */
  onSubmit: (value: string) => void;
  /** Aria-label for the input. */
  label?: string;
  placeholder?: string;
};

/**
 * Search field with debounced submission. Keeps the visible input
 * in sync with the URL state when the URL changes externally
 * (e.g., via the Clear filters link).
 */
export function IssueSearch({
  initialValue = "",
  onSubmit,
  label = "Search the archive",
  placeholder = "Search by title, topic, article, or text…",
}: IssueSearchProps) {
  const [value, setValue] = useState(initialValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function scheduleSubmit(next: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSubmit(next), 280);
  }

  return (
    <form
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        if (debounceRef.current) clearTimeout(debounceRef.current);
        onSubmit(value);
      }}
      className="relative flex-1"
    >
      <label htmlFor="archive-search" className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
        aria-hidden="true"
      />
      <input
        id="archive-search"
        type="search"
        value={value}
        onChange={(event) => {
          const next = event.target.value;
          setValue(next);
          scheduleSubmit(next);
        }}
        placeholder={placeholder}
        className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-10 pr-10 text-sm text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-700/40"
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            setValue("");
            onSubmit("");
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : null}
    </form>
  );
}
