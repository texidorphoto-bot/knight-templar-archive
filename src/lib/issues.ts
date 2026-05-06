import issuesJson from "@/data/issues.json";
import type { Issue } from "@/lib/types";

/**
 * Static data access layer. UI never imports issues.json directly.
 *
 * Swap this module to a Supabase / Postgres / API client when the archive
 * outgrows static JSON. The function signatures below are the public
 * contract the rest of the app depends on.
 */

const ISSUES: Issue[] = issuesJson as Issue[];

export function getAllIssues(): Issue[] {
  return ISSUES;
}

export function getIssueBySlug(slug: string): Issue | undefined {
  return ISSUES.find((issue) => issue.slug === slug);
}

export function getAllYears(): number[] {
  const years = ISSUES
    .map((issue) => issue.year)
    .filter((year): year is number => typeof year === "number");

  return Array.from(new Set(years)).sort((a, b) => b - a);
}

export function getAllTopics(): string[] {
  const topics = ISSUES.flatMap((issue) => issue.topics);
  return Array.from(new Set(topics)).sort((a, b) => a.localeCompare(b));
}

/**
 * Find issues that share at least one topic with the given issue,
 * excluding the issue itself. Used on the detail page for "Related Issues".
 */
export function getRelatedIssues(slug: string, limit = 3): Issue[] {
  const current = getIssueBySlug(slug);
  if (!current) return [];

  const scored = ISSUES
    .filter((issue) => issue.slug !== slug)
    .map((issue) => {
      const overlap = issue.topics.filter((t) => current.topics.includes(t)).length;
      return { issue, overlap };
    })
    .filter(({ overlap }) => overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      return b.issue.publicationDate.localeCompare(a.issue.publicationDate);
    });

  return scored.slice(0, limit).map(({ issue }) => issue);
}
