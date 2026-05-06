import { Calendar, FileText, Tag, Hash } from "lucide-react";
import type { Issue } from "@/lib/types";
import { formatPublicationDate } from "@/lib/utils";

type IssueMetadataProps = {
  issue: Issue;
};

/**
 * Metadata panel rendered to the right of the issue title on the
 * detail page. Surfaces the canonical record fields in a scannable
 * key/value layout.
 */
export function IssueMetadata({ issue }: IssueMetadataProps) {
  const rows: Array<{ icon: React.ReactNode; label: string; value: string }> = [
    {
      icon: <Calendar className="h-4 w-4" aria-hidden="true" />,
      label: "Published",
      value: formatPublicationDate(issue.publicationDate),
    },
  ];

  if (issue.volume) {
    rows.push({
      icon: <Hash className="h-4 w-4" aria-hidden="true" />,
      label: "Volume",
      value: issue.volume,
    });
  }
  if (issue.issueNumber) {
    rows.push({
      icon: <Tag className="h-4 w-4" aria-hidden="true" />,
      label: "Issue",
      value: issue.issueNumber,
    });
  }
  if (typeof issue.pageCount === "number") {
    rows.push({
      icon: <FileText className="h-4 w-4" aria-hidden="true" />,
      label: "Pages",
      value: String(issue.pageCount),
    });
  }

  return (
    <dl className="grid grid-cols-1 gap-3 rounded-2xl border border-stone-200 bg-white p-5 text-sm shadow-sm sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.label} className="flex items-start gap-2">
          <span className="mt-0.5 text-stone-500">{row.icon}</span>
          <div>
            <dt className="text-xs uppercase tracking-wide text-stone-500">{row.label}</dt>
            <dd className="font-medium text-stone-900">{row.value}</dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
