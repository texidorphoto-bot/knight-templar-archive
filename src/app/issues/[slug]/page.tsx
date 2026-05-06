import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { getAllIssues, getIssueBySlug, getRelatedIssues } from "@/lib/issues";
import { IssueMetadata } from "@/components/archive/IssueMetadata";
import { MagazineViewerLoader as MagazineViewer } from "@/components/archive/MagazineViewerLoader";
import { TopicBadge } from "@/components/archive/TopicBadge";
import { IssueCard } from "@/components/archive/IssueCard";
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
  const dateLabel = formatPublicationLabel(issue.publicationDate, issue.month, issue.year);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 underline-offset-4 hover:text-stone-950 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to archive
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,260px)_1fr]">
        {/* Cover thumbnail */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="relative aspect-[935/1210] w-full bg-stone-100">
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
          <p className="mb-2 text-xs uppercase tracking-[0.22em] text-stone-500">
            {dateLabel}
            {issue.volume ? ` · Volume ${issue.volume}` : ""}
          </p>
          <h1 className="font-serif text-3xl leading-tight text-stone-900 text-balance sm:text-4xl">
            {issue.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-stone-700">
            {issue.summary ?? issue.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {issue.topics.map((topic) => (
              <TopicBadge
                key={topic}
                topic={topic}
                href={`/?topic=${encodeURIComponent(topic)}`}
              />
            ))}
          </div>

          <div className="mt-6">
            <IssueMetadata issue={issue} />
          </div>

          {issue.featuredArticles && issue.featuredArticles.length > 0 ? (
            <section className="mt-8">
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Featured in this issue
              </h2>
              <ul className="mt-3 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white shadow-sm">
                {issue.featuredArticles.map((article, index) => (
                  <li
                    key={article}
                    className="flex items-baseline gap-3 px-4 py-3 text-sm"
                  >
                    <span className="w-6 text-stone-400 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-base text-stone-900">{article}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>

      {/* PDF viewer spans full width below the metadata column */}
      <section className="mt-12">
        <MagazineViewer pdfUrl={issue.pdfUrl} title={issue.title} />
      </section>

      {issue.needsOcr ? (
        <p className="mt-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          This issue&rsquo;s text layer is missing or low-quality. Search results may be
          incomplete until the PDF is re-processed with OCR.
        </p>
      ) : null}

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
