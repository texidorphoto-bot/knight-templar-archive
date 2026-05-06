import type { Issue } from "@/lib/types";
import { IssueCard } from "@/components/archive/IssueCard";
import { buildSearchSnippet } from "@/lib/search";

type IssueGridProps = {
  issues: Issue[];
  /** When set, IssueCard renders a search-snippet preview below the description. */
  query?: string;
};

export function IssueGrid({ issues, query }: IssueGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {issues.map((issue) => (
        <IssueCard
          key={issue.id}
          issue={issue}
          searchSnippet={query ? buildSearchSnippet(issue, query) : null}
        />
      ))}
    </div>
  );
}
