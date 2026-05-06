"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Filter } from "lucide-react";
import { useTransition } from "react";
import { IssueSearch } from "@/components/archive/IssueSearch";
import { IssueSort } from "@/components/archive/IssueSort";
import type { IssueSort as IssueSortValue } from "@/lib/types";
import { cn } from "@/lib/utils";

type IssueFiltersProps = {
  years: number[];
  topics: string[];
  totalCount: number;
  visibleCount: number;
};

const VALID_SORTS: IssueSortValue[] = ["newest", "oldest", "title-asc"];

/**
 * Top-of-page filter bar. Owns the URL query string for the archive view.
 * Each control updates one search param via router.push, keeping the URL
 * shareable and the current state recoverable on refresh.
 */
export function IssueFilters({
  years,
  topics,
  totalCount,
  visibleCount,
}: IssueFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const query = searchParams.get("q") ?? "";
  const year = searchParams.get("year") ?? "all";
  const topic = searchParams.get("topic") ?? "all";
  const rawSort = searchParams.get("sort") ?? "newest";
  const sort: IssueSortValue = (VALID_SORTS as string[]).includes(rawSort)
    ? (rawSort as IssueSortValue)
    : "newest";

  const isFiltered =
    query.length > 0 || year !== "all" || topic !== "all" || sort !== "newest";

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (!value || value === "all" || (key === "sort" && value === "newest")) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    const qs = next.toString();
    startTransition(() => {
      router.push(qs ? `/?${qs}` : "/", { scroll: false });
    });
  }

  return (
    <section
      aria-label="Archive filters"
      className={cn(
        "rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5",
        isPending && "opacity-90"
      )}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <IssueSearch
          initialValue={query}
          onSubmit={(value) => setParam("q", value)}
        />

        <div className="flex flex-wrap items-center gap-2">
          <SelectField
            id="filter-year"
            label="Year"
            value={year}
            onChange={(value) => setParam("year", value)}
            options={[
              { value: "all", label: "All years" },
              ...years.map((y) => ({ value: String(y), label: String(y) })),
            ]}
          />
          <SelectField
            id="filter-topic"
            label="Topic"
            value={topic}
            onChange={(value) => setParam("topic", value)}
            options={[
              { value: "all", label: "All topics" },
              ...topics.map((t) => ({ value: t, label: t })),
            ]}
          />
          <IssueSort value={sort} onChange={(value) => setParam("sort", value)} />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 pt-3 text-xs text-stone-500">
        <p className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5" aria-hidden="true" />
          <span>
            Showing <span className="font-medium text-stone-800">{visibleCount}</span> of{" "}
            <span className="font-medium text-stone-800">{totalCount}</span>{" "}
            {totalCount === 1 ? "issue" : "issues"}
          </span>
        </p>
        {isFiltered ? (
          <Link
            href="/"
            className="font-medium text-stone-700 underline underline-offset-4 hover:text-stone-950"
          >
            Clear filters
          </Link>
        ) : null}
      </div>
    </section>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
};

function SelectField({ id, label, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="appearance-none rounded-full border border-stone-300 bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-stone-800 shadow-sm focus:border-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-700/40"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {label}: {option.label}
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
