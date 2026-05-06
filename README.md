# Knight's Templar Magazine — Digital Archive

A searchable digital archive for the *Knight Templar* magazine, the quarterly publication of the Grand Encampment of Knights Templar of the United States of America (Volume LXXI in 2025; ISSN 2994-7189 print, 2994-7170 online; managing editor Ben Williams; published by Laughing Lion LLC).

This is a Next.js 14 (App Router) MVP designed to scale from four sample issues to 100+ without rework. The data layer is intentionally swappable: today it reads a static JSON seed, tomorrow it can point at Supabase Postgres + Storage. See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full design.

## What's included

- Archive home with cover-thumbnail grid, full-text-ish search, year filter, topic filter, and sort controls (URL-driven so views are shareable).
- Issue detail page with title, masthead metadata, topic chips, featured-articles list, in-browser PDF viewer (iframe), and related issues by topic overlap.
- About page describing sourcing, contribution, and attribution.
- Four real seed issues with extracted text, real cover thumbnails, and authentic metadata (Spring 2025, Summer 2025, Fall 2025, Winter 2025).

## Local setup

```bash
cd archive
npm install
npm run dev
```

The site will run at <http://localhost:3000>.

## Build and lint

```bash
npm run lint
npm run build
npm start
```

`npm run build` produces a fully static export of the home and about pages, plus a static page per issue slug via `generateStaticParams`.

## Adding a new issue

1. Drop the source PDF into `public/issues/your-slug.pdf`.
2. Generate (or hand-place) a cover thumbnail at `public/covers/your-slug.jpg`. A 935×1210 JPG works well; the brief sample uses 110 DPI of page 1. From the command line:

   ```bash
   pdftoppm -jpeg -r 110 -f 1 -l 1 path/to/source.pdf public/covers/your-slug
   mv public/covers/your-slug-01.jpg public/covers/your-slug.jpg
   ```

3. Append a record to `src/data/issues.json`:

   ```json
   {
     "id": "your-slug",
     "slug": "your-slug",
     "title": "Knight Templar — Spring 2026",
     "publicationDate": "2026-03-01",
     "year": 2026,
     "month": "March",
     "volume": "LXXII",
     "issueNumber": "Spring 2026",
     "description": "Editorial summary of the issue…",
     "topics": ["Knights Templar", "Historical essays"],
     "pdfUrl": "/issues/your-slug.pdf",
     "coverImageUrl": "/covers/your-slug.jpg",
     "pageCount": 52,
     "extractedText": "First few KB of cleaned text from the PDF…",
     "summary": "Longer summary used on the detail page.",
     "featuredArticles": ["Cover Article 1", "Cover Article 2"],
     "needsOcr": false,
     "createdAt": "2026-03-01T00:00:00.000Z",
     "updatedAt": "2026-03-01T00:00:00.000Z"
   }
   ```

4. If `topics` introduces a new tag, add it to `src/data/topics.json` so the topic filter shows it.
5. Restart the dev server. The new issue appears on the home grid and at `/issues/your-slug`.

For text extraction, `pdftotext` works well on PDFs with an embedded text layer. For scanned issues, set `needsOcr: true` and circle back with an OCR pass (Tesseract, Google Document AI, AWS Textract, or Adobe PDF Services). See `scripts/ingest-pdf.ts` for the planned automation.

## Bulk ingestion path

`scripts/ingest-pdf.ts` is a scaffold for automating the steps above when you onboard the remaining 100+ issues. It is intentionally annotated rather than fully implemented in this MVP. The annotated steps document exactly what production-grade ingestion needs to do.

## File organization

```
archive/
├── public/
│   ├── issues/           # Source PDFs (large; gitignored by default)
│   └── covers/           # Cover thumbnails (small; commit-friendly)
├── scripts/
│   └── ingest-pdf.ts     # Annotated ingestion plan
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx              # Archive home
│   │   ├── about/page.tsx        # About
│   │   ├── issues/[slug]/page.tsx # Issue detail
│   │   ├── layout.tsx            # Root layout (header + footer)
│   │   └── globals.css           # Archival library palette
│   ├── components/
│   │   ├── archive/      # Cards, grid, filters, search, sort, PDF viewer
│   │   └── layout/       # SiteHeader, SiteFooter
│   ├── data/
│   │   ├── issues.json   # Seed metadata (swap for DB layer later)
│   │   └── topics.json   # Topic taxonomy
│   └── lib/
│       ├── issues.ts     # Data access layer (the only consumer of issues.json)
│       ├── search.ts     # Filter / sort / snippet helpers
│       ├── types.ts      # Issue, IssueSort, IssueFilters
│       └── utils.ts      # cn() + date formatting
├── ARCHITECTURE.md       # Design rationale and migration path
├── README.md             # This file
└── package.json
```

## Deployment notes

- The four sample PDFs total ~330 MB. They are gitignored by default. For production deployment (Vercel, Netlify, etc.) you should host PDFs in object storage (Supabase Storage, AWS S3, Cloudflare R2) and update `pdfUrl` to the absolute storage URL. The data layer abstraction (`src/lib/issues.ts`) means UI code does not need to change when this happens.
- Cover thumbnails (~150 KB each) are small enough to commit directly.
- The PDF viewer uses a native iframe, so the host must serve PDFs with `Content-Type: application/pdf`. Most CDN setups do this automatically.

## Future enhancements

- Postgres + tsvector full-text search (or Supabase, with pgvector for semantic search later).
- Admin upload UI that runs the ingestion pipeline server-side.
- Automated OCR for scanned issues, with a queued worker rather than synchronous extraction.
- AI-generated summaries and topic suggestions.
- Timeline/decade browsing.
- Article-level indexing so users can deep-link into a specific feature article.
- CSV export of the metadata catalog for librarians and researchers.
