import type { Issue, IssueFilters, IssueSort } from "@/lib/types";

/**
 * Search / filter / sort helpers for the static archive.
 *
 * The current implementation is a simple in-memory pass over an array.
 * That is fine for ~hundreds of issues. For thousands you'd want a real
 * inverted index (lunr, MiniSearch) or a database with full-text search
 * (Postgres tsvector / Supabase). The shape of `filterIssues` is designed
 * so its callers don't need to change when that swap happens.
 */

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function issueMatchesQuery(issue: Issue, query: string): boolean {
  const q = normalize(query);
  if (!q) return true;

  const haystack = [
    issue.title,
    issue.description,
    issue.summary ?? "",
    issue.publicationDate,
    issue.year?.toString() ?? "",
    issue.month ?? "",
    issue.volume ?? "",
    issue.issueNumber ?? "",
    ...(issue.topics ?? []),
    ...(issue.featuredArticles ?? []),
    issue.extractedText ?? "",
  ]
    .join(" ")
    .toLowerCase();

  // Multi-token AND: every space-separated token in the query must appear.
  return q.split(/\s+/).every((token) => haystack.includes(token));
}

export function filterIssues(issues: Issue[], filters: IssueFilters): Issue[] {
  const query = filters.query ?? "";
  const year = filters.year ?? "all";
  const topic = filters.topic ?? "all";
  const sort: IssueSort = filters.sort ?? "newest";

  const filtered = issues.filter((issue) => {
    const matchesQuery = issueMatchesQuery(issue, query);
    const matchesYear = year === "all" || issue.year?.toString() === year;
    const matchesTopic = topic === "all" || issue.topics.includes(topic);
    return matchesQuery && matchesYear && matchesTopic;
  });

  return filtered.sort((a, b) => {
    if (sort === "title-asc") return a.title.localeCompare(b.title);
    if (sort === "oldest") return a.publicationDate.localeCompare(b.publicationDate);
    return b.publicationDate.localeCompare(a.publicationDate);
  });
}

/**
 * Build a short text snippet around the first occurrence of a query term.
 * Returns null if no match. Used to surface search context on cards.
 */
export function buildSearchSnippet(
  issue: Issue,
  query: string,
  windowChars = 140
): string | null {
  const q = normalize(query);
  if (!q) return null;
  const text = (issue.extractedText ?? issue.description ?? "").toLowerCase();
  const idx = text.indexOf(q.split(/\s+/)[0] ?? "");
  if (idx === -1) return null;

  const source = issue.extractedText ?? issue.description ?? "";
  const start = Math.max(0, idx - Math.floor(windowChars / 2));
  const end = Math.min(source.length, start + windowChars);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < source.length ? "…" : "";
  return `${prefix}${source.slice(start, end).trim()}${suffix}`;
}
