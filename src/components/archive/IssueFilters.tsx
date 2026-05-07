"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
        "border border-vellum-warm bg-cream shadow-parchment",
        isPending && "opacity-80"
      )}
      style={{ borderRadius: "var(--radius-card)", padding: "var(--space-4)" }}
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

      {/* Results count and reset */}
      <div
        className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-vellum-warm pt-3"
      >
        <p className="font-ui text-cloister-stone" style={{ fontSize: "0.75rem" }}>
          Showing{" "}
          <span className="font-medium text-iron-gall">{visibleCount}</span> of{" "}
          <span className="font-medium text-iron-gall">{totalCount}</span>{" "}
          {totalCount === 1 ? "issue" : "issues"}
        </p>
        {isFiltered ? (
          <Link
            href="/"
            className="font-ui font-medium text-seal-wax no-underline hover:text-templar-red hover:underline"
            style={{ fontSize: "0.75rem", textUnderlineOffset: "3px", transitionDuration: "var(--duration-quick)" }}
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
        className="appearance-none bg-cream text-iron-gall font-ui"
        style={{
          border: "1px solid var(--color-border-strong)",
          borderRadius: "var(--radius-subtle)",
          padding: "0.5rem 2.25rem 0.5rem 0.75rem",
          fontSize: "0.875rem",
          cursor: "pointer",
          outline: "none",
          transition: `border-color var(--duration-quick) var(--ease-quick)`,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-illumination)";
          e.currentTarget.style.boxShadow = "0 0 0 1px var(--color-illumination)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "";
          e.currentTarget.style.boxShadow = "";
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {label}: {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-cloister-stone"
        aria-hidden="true"
      />
    </div>
  );
}
