import { Suspense } from "react";
import { getAllIssues, getAllTopics, getAllYears } from "@/lib/issues";
import { filterIssues } from "@/lib/search";
import type { IssueFilters as IssueFilterValues, IssueSort } from "@/lib/types";
import { IssueGrid } from "@/components/archive/IssueGrid";
import { IssueFilters } from "@/components/archive/IssueFilters";
import { EmptyState } from "@/components/archive/EmptyState";

const VALID_SORTS: IssueSort[] = ["newest", "oldest", "title-asc"];

type HomePageProps = {
  searchParams?: {
    q?: string | string[];
    year?: string | string[];
    topic?: string | string[];
    sort?: string | string[];
  };
};

function takeFirst(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export default function HomePage({ searchParams }: HomePageProps) {
  const allIssues = getAllIssues();
  const years = getAllYears();
  const topics = getAllTopics();

  const rawSort = takeFirst(searchParams?.sort);
  const sort: IssueSort =
    rawSort && (VALID_SORTS as string[]).includes(rawSort)
      ? (rawSort as IssueSort)
      : "newest";

  const filters: IssueFilterValues = {
    query: takeFirst(searchParams?.q) ?? "",
    year: takeFirst(searchParams?.year) ?? "all",
    topic: takeFirst(searchParams?.topic) ?? "all",
    sort,
  };

  const visibleIssues = filterIssues(allIssues, filters);

  return (
    <div
      className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14"
    >
      {/* Page header */}
      <section className="mb-10" style={{ maxWidth: "var(--max-reading)" }}>
        <h1
          className="font-display font-medium text-iron-gall text-balance"
          style={{ fontSize: "var(--text-h1)", lineHeight: 1.1 }}
        >
          Knights Templar Magazine
        </h1>
        <p
          className="mt-4 font-body text-iron-gall-soft leading-relaxed"
          style={{ fontSize: "var(--text-body-large)" }}
        >
          Seventy years of correspondence, ritual, and reflection from the Grand
          Encampment of Knights Templar of the United States of America. Every issue,
          kept and made searchable, in one home worthy of the record.
        </p>
      </section>

      {/* Filter bar */}
      <Suspense fallback={null}>
        <IssueFilters
          years={years}
          topics={topics}
          totalCount={allIssues.length}
          visibleCount={visibleIssues.length}
        />
      </Suspense>

      {/* Issue grid */}
      <section className="mt-8">
        {visibleIssues.length === 0 ? (
          <EmptyState />
        ) : (
          <IssueGrid issues={visibleIssues} query={filters.query} />
        )}
      </section>
    </div>
  );
}
