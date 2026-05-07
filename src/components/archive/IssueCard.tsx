import Link from "next/link";
import Image from "next/image";
import { FileText } from "lucide-react";
import type { Issue } from "@/lib/types";
import { TopicBadge } from "@/components/archive/TopicBadge";
import { formatPublicationLabel } from "@/lib/utils";
import { highlightTerms } from "@/lib/highlight";
import { CodexButton } from "@/components/archive/CodexButton";

type IssueCardProps = {
  issue: Issue;
  searchSnippet?: string | null;
  /** Active search query — when present, matching tokens are highlighted. */
  query?: string;
};

export function IssueCard({ issue, searchSnippet, query = "" }: IssueCardProps) {
  const href = `/issues/${issue.slug}`;
  const dateLabel = formatPublicationLabel(issue.publicationDate, issue.month, issue.year);
  const visibleTopics = issue.topics.slice(0, 3);
  const remainingTopics = issue.topics.length - visibleTopics.length;

  return (
    <article
      className="card-archive group flex h-full flex-col overflow-hidden bg-cream border border-vellum-warm shadow-parchment focus-within:outline focus-within:outline-2 focus-within:outline-illumination"
      style={{ borderRadius: "var(--radius-card)" }}
    >
      {/* Cover image */}
      <Link
        href={href}
        className="relative block aspect-[935/1210] w-full overflow-hidden bg-vellum-warm"
        aria-label={`Open ${issue.title}`}
        tabIndex={-1}
      >
        {issue.coverImageUrl ? (
          <Image
            src={issue.coverImageUrl}
            alt={`${issue.title} cover`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform group-hover:scale-[1.015]"
            style={{ transitionDuration: "var(--duration-ceremonial)", transitionTimingFunction: "var(--ease-quick)" }}
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-cloister-stone">
            <FileText className="h-10 w-10" aria-hidden="true" />
            <span className="sr-only">No cover image available</span>
          </div>
        )}
        {/* Codex save button — top right over cover */}
        <div className="absolute right-2 top-2 z-10">
          <CodexButton slug={issue.slug} variant="compact" />
        </div>

        {/* Single-pixel gold rule below cover, per §7.2 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "var(--color-illumination)", opacity: 0.45 }}
          aria-hidden="true"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Date and volume overline */}
        <div
          className="flex items-center justify-between font-ui text-cloister-stone"
          style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          <span>{dateLabel}</span>
          {issue.volume ? <span>Vol. {issue.volume}</span> : null}
        </div>

        {/* Title in Cinzel H4 */}
        <h3
          className="font-display font-medium leading-snug text-iron-gall"
          style={{ fontSize: "var(--text-h4)" }}
        >
          <Link
            href={href}
            className="no-underline hover:underline"
            style={{ textDecorationColor: "var(--color-illumination)", textUnderlineOffset: "3px" }}
          >
            {highlightTerms(issue.title, query)}
          </Link>
        </h3>

        {/* Description in EB Garamond */}
        <p
          className="line-clamp-3 font-body text-iron-gall-soft leading-relaxed"
          style={{ fontSize: "0.9375rem" }}
        >
          {highlightTerms(issue.description, query)}
        </p>

        {/* Search snippet */}
        {searchSnippet ? (
          <p
            className="rounded border border-vellum-warm bg-vellum px-3 py-2 font-body italic leading-relaxed text-iron-gall-soft"
            style={{ fontSize: "0.875rem" }}
          >
            {highlightTerms(searchSnippet, query)}
          </p>
        ) : null}

        {/* Topic badges */}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {visibleTopics.map((topic) => (
            <TopicBadge key={topic} topic={topic} />
          ))}
          {remainingTopics > 0 ? (
            <span
              className="inline-flex items-center border border-vellum-warm bg-vellum font-ui text-cloister-stone"
              style={{ fontSize: "0.75rem", padding: "0.125rem 0.625rem", borderRadius: "var(--radius-pill)" }}
            >
              +{remainingTopics}
            </span>
          ) : null}
        </div>

        {/* CTA link */}
        <Link
          href={href}
          className="mt-2 inline-flex items-center gap-1.5 font-ui font-medium text-seal-wax no-underline transition-colors hover:text-templar-red"
          style={{ fontSize: "0.875rem", transitionDuration: "var(--duration-quick)" }}
        >
          Open the issue
          <span aria-hidden="true" className="text-illumination">›</span>
        </Link>
      </div>
    </article>
  );
}
