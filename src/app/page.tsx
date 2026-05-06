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
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="mb-10 max-w-3xl">
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-stone-500">
          Digital Archive
        </p>
        <h1 className="font-serif text-4xl leading-tight text-stone-900 text-balance sm:text-5xl">
          Knight&rsquo;s Templar Magazine
        </h1>
        <p className="mt-4 text-base leading-relaxed text-stone-600">
          A searchable archive of <em>Knight Templar</em>, the quarterly publication of the
          Grand Encampment of Knights Templar of the United States of America. Browse by
          season, search across articles and issue contents, and open the full PDF of any
          issue.
        </p>
      </section>

      <Suspense fallback={null}>
        <IssueFilters
          years={years}
          topics={topics}
          totalCount={allIssues.length}
          visibleCount={visibleIssues.length}
        />
      </Suspense>

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
