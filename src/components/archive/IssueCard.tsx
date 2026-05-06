import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import type { Issue } from "@/lib/types";
import { TopicBadge } from "@/components/archive/TopicBadge";
import { formatPublicationLabel } from "@/lib/utils";

type IssueCardProps = {
  issue: Issue;
  /** Optional excerpt to surface as a search snippet under the description. */
  searchSnippet?: string | null;
};

export function IssueCard({ issue, searchSnippet }: IssueCardProps) {
  const href = `/issues/${issue.slug}`;
  const dateLabel = formatPublicationLabel(issue.publicationDate, issue.month, issue.year);
  const visibleTopics = issue.topics.slice(0, 3);
  const remainingTopics = issue.topics.length - visibleTopics.length;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-stone-400 hover:shadow-md focus-within:ring-2 focus-within:ring-stone-700">
      <Link
        href={href}
        className="relative aspect-[935/1210] w-full overflow-hidden bg-stone-100"
        aria-label={`Open ${issue.title}`}
      >
        {issue.coverImageUrl ? (
          <Image
            src={issue.coverImageUrl}
            alt={`${issue.title} cover`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-stone-400">
            <FileText className="h-10 w-10" aria-hidden="true" />
            <span className="sr-only">No cover image available</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-stone-500">
          <span>{dateLabel}</span>
          {issue.volume ? <span>Vol. {issue.volume}</span> : null}
        </div>

        <h3 className="font-serif text-xl leading-snug text-stone-900">
          <Link href={href} className="hover:underline underline-offset-4">
            {issue.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-sm leading-relaxed text-stone-600">
          {issue.description}
        </p>

        {searchSnippet ? (
          <p className="rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-xs italic leading-relaxed text-stone-600">
            {searchSnippet}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {visibleTopics.map((topic) => (
            <TopicBadge key={topic} topic={topic} />
          ))}
          {remainingTopics > 0 ? (
            <span className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5 text-xs text-stone-500">
              +{remainingTopics}
            </span>
          ) : null}
        </div>

        <Link
          href={href}
          className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-stone-800 underline-offset-4 hover:underline"
        >
          Read Issue
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
