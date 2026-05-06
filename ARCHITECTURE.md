# Architecture

This document explains the design choices behind the Knight's Templar Magazine Digital Archive and the migration path for scaling beyond the four-issue MVP. It is intentionally short. Long ADR-style discussion lives in commit messages or in this file's "Decisions" section as decisions accumulate.

## Goals (in priority order)

1. The archive must work today with a handful of issues, and look like a real magazine library, not a dev demo.
2. The data layer must be swappable without touching UI code, so we can move to a real database when the catalog grows past what static JSON can comfortably index in-process.
3. Every operation a librarian does — adding an issue, regenerating a cover, fixing a typo in a description — must be a single small change in one place.
4. The site must remain accessible (keyboard navigation, screen-reader labels) and responsive on phones.

## Stack

- **Next.js 14, App Router, TypeScript.** Server-rendered home and detail pages, client-side filter controls only where they need to update the URL.
- **Tailwind CSS** with a single editorial palette (warm stone neutrals, system serif headlines).
- **lucide-react** for icons.
- **iframe PDF viewer** as the brief specifies. Reliable across browsers, no PDF.js worker config to babysit. Replace with `react-pdf` later if per-page navigation becomes worth the complexity.
- **No external font fetch.** Headlines use a system serif stack (Iowan Old Style → Palatino → Georgia → Times). Fast and durable.

## Data flow

```
src/data/issues.json   ─┐
                        │
src/lib/issues.ts  (data access layer)
                        │
                        ├─ src/app/page.tsx          (archive home)
                        ├─ src/app/issues/[slug]     (detail page)
                        └─ src/components/archive/*  (grid, card, filters)
```

Only `src/lib/issues.ts` imports `src/data/issues.json`. Everything else consumes the typed `Issue[]` it returns. To swap to Supabase, you reimplement `getAllIssues`, `getIssueBySlug`, `getAllYears`, `getAllTopics`, and `getRelatedIssues` against the database. Pages and components do not change.

## URL state for filters

The archive's search query, year filter, topic filter, and sort live in the URL (`/?q=…&year=…&topic=…&sort=…`). This buys three useful properties:

1. Views are shareable.
2. The browser back button works as expected.
3. Server components render the correct list on first paint, so no client-only filter flicker.

The `IssueFilters` component is the only client component that mutates the URL. `IssueSearch` and `IssueSort` are presentational — they emit values up to `IssueFilters` which calls `router.push`.

## PDF storage

For the MVP, PDFs sit in `public/issues/` and are served as static assets. This is fine locally. It is **not** fine in production for the full archive: at ~80 MB per issue and 100+ issues, a 7–9 GB `public/` folder fails Vercel/Netlify size limits and is wasteful to bundle.

Migration plan when the catalog grows past ~10 issues or before the first production deploy:

1. Move PDFs to object storage (Supabase Storage, S3, or Cloudflare R2).
2. Change `pdfUrl` in seed records (or in the new database table) to the absolute storage URL.
3. Configure the storage bucket with public read access, correct `Content-Type: application/pdf`, and a cache-control header tuned for a quasi-immutable corpus (e.g., `public, max-age=31536000, immutable`).
4. The iframe viewer in `PdfViewer.tsx` works without modification.

## Search

Today, search is a simple `Array.filter` over the in-memory issues list. Each issue's searchable haystack is `title + description + summary + publicationDate + year + month + volume + issueNumber + topics + featuredArticles + extractedText`. Multi-token queries are AND-matched.

This is fine for hundreds of issues. For thousands, three reasonable upgrades:

- **MiniSearch / lunr** in the browser. Pre-build an index at build time and ship it as JSON. Zero backend.
- **Postgres tsvector** in Supabase. Cleaner, supports stemming, ranks results, and gives you snippet highlighting via `ts_headline()`.
- **pgvector + an embedding model** for semantic search. Layer this on top of tsvector; do not replace it.

## Topic taxonomy

Topics are a free-form `string[]` per issue, with a curated master list in `src/data/topics.json` driving the filter dropdown. New topics can appear on issues without being in the master list (the `getAllTopics` helper unions both sources implicitly through the live data). Adding a topic to the master list is what exposes it as a filter option *before* any issue uses it.

If/when the archive moves to Supabase, model topics as a separate `topics` table joined through `issue_topics`. That gives you stable IDs, multilingual labels, and per-topic landing pages later.

## OCR

Issues with no text layer set `needsOcr: true`. The detail page surfaces a banner so search-quality limitations are visible to the user. The four MVP issues all have clean embedded text; this flag is built for the historical archive that's coming.

Production OCR options, in roughly decreasing quality and cost:

- Adobe PDF Services API.
- Google Document AI / Vision OCR.
- AWS Textract.
- Tesseract (local; free; good for clean scans, struggles with low-quality archive scans).

A reasonable default is "try Tesseract first, fall back to a paid service when confidence is low or the page count is large."

## Accessibility

- All filter controls have `<label>` elements (visually hidden where appropriate).
- Cards are keyboard-navigable: the cover and the title are both focusable links.
- Color contrast is AA-compliant on the warm-neutral palette.
- `aria-label`s on icon-only buttons (clear search, etc.).
- The PDF iframe carries the issue title as its `title` attribute so screen readers identify it.

## Decisions (running list)

- **Iframe over react-pdf**: simplicity over polish for MVP. The brief permits this.
- **No CMS yet**: editing one JSON file is faster than running a CMS for 4 issues. When we hit ~20 issues, revisit.
- **Slugs from human-readable season-year**: `knight-templar-spring-2025` rather than `2025-03-01` or a UUID. Easier to recognize in URLs and analytics; stable as long as the season label is stable.
- **System serif over webfont**: zero font fetch, durable across decades, matches the editorial mood the brief asked for.
- **PDFs in `public/issues/` for MVP, gitignored**: keeps local dev frictionless without bloating the repo. Hard cutover to object storage before any non-local deploy.
