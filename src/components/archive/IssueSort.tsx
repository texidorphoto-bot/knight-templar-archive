"use client";

import { ChevronDown } from "lucide-react";
import type { IssueSort as IssueSortValue } from "@/lib/types";

type IssueSortProps = {
  value: IssueSortValue;
  onChange: (next: IssueSortValue) => void;
};

const OPTIONS: Array<{ value: IssueSortValue; label: string }> = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "title-asc", label: "Title A–Z" },
];

export function IssueSort({ value, onChange }: IssueSortProps) {
  return (
    <div className="relative">
      <label htmlFor="archive-sort" className="sr-only">
        Sort issues
      </label>
      <select
        id="archive-sort"
        value={value}
        onChange={(event) => onChange(event.target.value as IssueSortValue)}
        className="appearance-none rounded-full border border-stone-300 bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-stone-800 shadow-sm focus:border-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-700/40"
      >
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            Sort: {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500"
        aria-hidden="true"
      />
    </div>
  );
}
