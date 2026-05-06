/**
 * Core domain types for the Knight's Templar Magazine Digital Archive.
 *
 * The data layer (src/lib/issues.ts) is the only place that loads issues
 * from disk. UI components consume these types and never reach into
 * data/issues.json directly. That keeps the door open to swapping the
 * static JSON store for Supabase or another backend without touching
 * page or component code.
 */

export type Issue = {
  /** Stable internal id. Use the same value as `slug` unless you have a reason not to. */
  id: string;
  /** URL slug. Used in /issues/[slug] routing. Must be unique. */
  slug: string;
  /** Human-readable issue title (e.g. "Knight Templar — Spring 2025"). */
  title: string;
  /** ISO date (YYYY-MM-DD) for the magazine's nominal publication date. */
  publicationDate: string;
  /** Calendar year of publication, derived from publicationDate. */
  year: number | null;
  /** Calendar month name of publication ("January", "March", etc.). */
  month: string | null;
  /** Optional volume label as printed in the masthead (e.g. "LXXI"). */
  volume?: string | null;
  /** Optional issue number or season label. */
  issueNumber?: string | null;
  /** Editorial summary shown on cards and detail pages. */
  description: string;
  /** Topic taxonomy. Drives the topic filter and the topic badges. */
  topics: string[];
  /** Public path to the original PDF (served from /public/issues/). */
  pdfUrl: string;
  /** Public path to the cover thumbnail JPG (served from /public/covers/). */
  coverImageUrl: string;
  /** Total page count of the PDF, when known. */
  pageCount?: number | null;
  /** Plain-text excerpt indexed for search. Keep this lean (a few KB max). */
  extractedText?: string;
  /** Longer editorial summary used on the detail page. Optional. */
  summary?: string;
  /** Cover-feature article titles. Drives the Featured Articles section. */
  featuredArticles?: string[];
  /** True if extracted text is empty/short and the issue likely needs OCR. */
  needsOcr?: boolean;
  /** ISO timestamp of when the record was first created. */
  createdAt: string;
  /** ISO timestamp of the most recent metadata update. */
  updatedAt: string;
};

export type IssueSort = "newest" | "oldest" | "title-asc";

export type IssueFilters = {
  query?: string;
  year?: string;
  topic?: string;
  sort?: IssueSort;
};
