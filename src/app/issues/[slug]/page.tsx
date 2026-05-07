import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { getAllIssues, getIssueBySlug, getRelatedIssues, getAdjacentIssues } from "@/lib/issues";
import { IssueMetadata } from "@/components/archive/IssueMetadata";
import { MagazineViewerLoader as MagazineViewer } from "@/components/archive/MagazineViewerLoader";
import { TopicBadge } from "@/components/archive/TopicBadge";
import { IssueCard } from "@/components/archive/IssueCard";
import { IssueNavigator } from "@/components/archive/IssueNavigator";
import { CitationTrigger } from "@/components/archive/CitationTrigger";
import { CodexButton } from "@/components/archive/CodexButton";
import { formatPublicationLabel } from "@/lib/utils";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllIssues().map((issue) => ({ slug: issue.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const issue = getIssueBySlug(params.slug);
  if (!issue) {
    return { title: "Issue not found" };
  }
  return {
    title: issue.title,
    description: issue.description,
    openGraph: {
      title: issue.title,
      description: issue.description,
      images: issue.coverImageUrl ? [{ url: issue.coverImageUrl }] : undefined,
      type: "article",
    },
  };
}

export default function IssueDetailPage({ params }: PageProps) {
  const issue = getIssueBySlug(params.slug);
  if (!issue) {
    notFound();
  }

  const related = getRelatedIssues(issue.slug, 3);
  const adjacent = getAdjacentIssues(issue.slug);
  const dateLabel = formatPublicationLabel(issue.publicationDate, issue.month, issue.year);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Breadcrumb back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 font-ui font-medium text-seal-wax no-underline hover:text-templar-red hover:underline"
        style={{ fontSize: "0.875rem", textUnderlineOffset: "3px", transitionDuration: "var(--duration-quick)" }}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Return to the Archive
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,260px)_1fr]">
        {/* Cover thumbnail */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div
            className="overflow-hidden border border-vellum-warm bg-cream shadow-parchment"
            style={{ borderRadius: "var(--radius-card)" }}
          >
            <div className="relative aspect-[935/1210] w-full bg-vellum-warm">
              {issue.coverImageUrl ? (
                <Image
                  src={issue.coverImageUrl}
                  alt={`${issue.title} cover`}
                  fill
                  sizes="(min-width: 1024px) 260px, 100vw"
                  className="object-cover"
                  priority
                />
              ) : null}
            </div>
          </div>
        </aside>

        {/* Title, description, metadata */}
        <div>
          {/* Eyebrow overline per §5.3 */}
          <p className="overline mb-2">
            {dateLabel}
            {issue.volume ? ` · Volume ${issue.volume}` : ""}
          </p>

          {/* H1 in Cinzel */}
          <h1
            className="font-display font-medium text-iron-gall text-balance"
            style={{ fontSize: "var(--text-h1)", lineHeight: 1.1 }}
          >
            {issue.title}
          </h1>

          {/* Summary in EB Garamond */}
          <p
            className="mt-4 font-body text-iron-gall-soft leading-relaxed"
            style={{ fontSize: "var(--text-body-large)" }}
          >
            {issue.summary ?? issue.description}
          </p>

          {/* Action row: Cite + Codex */}
          <div className="mt-5 flex items-center gap-5">
            <CitationTrigger issue={issue} />
            <CodexButton slug={issue.slug} variant="full" />
          </div>

          {/* Topic badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {issue.topics.map((topic) => (
              <TopicBadge
                key={topic}
                topic={topic}
                href={`/?topic=${encodeURIComponent(topic)}`}
              />
            ))}
          </div>

          {/* Metadata table per §7.6 */}
          <div
            className="mt-6 border border-vellum-warm bg-cream shadow-parchment"
            style={{ borderRadius: "var(--radius-card)", padding: "var(--space-4) var(--space-5)" }}
          >
            <IssueMetadata issue={issue} />
          </div>

          {/* Featured articles */}
          {issue.featuredArticles && issue.featuredArticles.length > 0 ? (
            <section className="mt-8">
              <h2
                className="font-ui font-semibold text-cloister-stone mb-3"
                style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                Featured in this issue
              </h2>
              <ul
                className="divide-y divide-vellum-warm border border-vellum-warm bg-cream shadow-parchment"
                style={{ borderRadius: "var(--radius-card)" }}
              >
                {issue.featuredArticles.map((article, index) => (
                  <li
                    key={article}
                    className="flex items-baseline gap-3 px-4 py-3"
                  >
                    <span
                      className="w-6 flex-shrink-0 font-mono text-cloister-stone tabular-nums"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-body text-iron-gall"
                      style={{ fontSize: "var(--text-body-large)" }}
                    >
                      {article}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>

      {/* Full-width PDF viewer */}
      <section className="mt-12">
        <MagazineViewer pdfUrl={issue.pdfUrl} title={issue.title} />
      </section>

      {/* OCR warning */}
      {issue.needsOcr ? (
        <p
          className="mt-6 font-ui text-iron-gall-soft"
          style={{
            border: "1px solid var(--color-warning)",
            borderRadius: "var(--radius-card)",
            background: "rgba(139, 105, 20, 0.07)",
            padding: "0.75rem 1rem",
            fontSize: "0.875rem",
          }}
        >
          This issue is being recovered. Search will return more results once the text layer is restored.
        </p>
      ) : null}

      {/* Previous / Next navigator */}
      <section className="mt-10">
        <IssueNavigator prev={adjacent.prev} next={adjacent.next} />
      </section>

      {/* Related issues */}
      {related.length > 0 ? (
        <section className="mt-16">
          <p className="rule-ornament mb-6">Related Issues</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => (
              <IssueCard key={rel.id} issue={rel} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
