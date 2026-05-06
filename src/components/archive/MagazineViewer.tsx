"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Download, ExternalLink } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

type Props = {
  pdfUrl: string;
  title: string;
  downloadName?: string;
};

export function MagazineViewer({ pdfUrl, title, downloadName }: Props) {
  const [numPages, setNumPages] = useState(0);
  // firstPage is the left page of the current spread (1 = cover view, shown alone)
  const [firstPage, setFirstPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState(900);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setContainerWidth(entry.contentRect.width)
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Show 2-page spread when container is wide enough
  const isTwoPage = containerWidth >= 560;

  // Cover (page 1) is always shown alone, centered
  const isCover = firstPage === 1;

  // In two-page mode: spread is [firstPage, firstPage+1] (except cover)
  // In one-page mode: show firstPage only
  const leftPage = isCover ? null : firstPage;
  const rightPage = isCover
    ? 1
    : isTwoPage && firstPage + 1 <= numPages
    ? firstPage + 1
    : isCover
    ? 1
    : null;

  const canGoPrev = firstPage > 1;
  const canGoNext = isCover
    ? numPages > 1
    : isTwoPage
    ? firstPage + 2 <= numPages
    : firstPage + 1 <= numPages;

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    if (firstPage <= 2) {
      setFirstPage(1); // back to cover
    } else {
      setFirstPage((p) => p - (isTwoPage ? 2 : 1));
    }
  }, [canGoPrev, firstPage, isTwoPage]);

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    setFirstPage((p) => (p === 1 ? 2 : p + (isTwoPage ? 2 : 1)));
  }, [canGoNext, isTwoPage]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  // Page widths — cover is capped narrower so it doesn't look oversized
  const spreadPageW = Math.floor((containerWidth - 96) / 2);
  const singlePageW = containerWidth - 80;
  const coverW = Math.min(spreadPageW, 340);

  const pageLabel = () => {
    if (numPages === 0) return "";
    if (isCover) return `Page 1 of ${numPages}`;
    const shown = rightPage && isTwoPage ? `${leftPage}–${rightPage}` : `${leftPage}`;
    return `Pages ${shown} of ${numPages}`;
  };

  const filename = downloadName ?? pdfUrl.split("/").pop() ?? "issue.pdf";

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-white px-4 py-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-700">
          Read full issue
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline"
          >
            Open in new tab
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={pdfUrl}
            download={filename}
            className="inline-flex items-center gap-1 font-medium text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline"
          >
            Download
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Viewer */}
      <div ref={containerRef} aria-label={title} className="flex flex-col items-center gap-5 px-2 py-8 sm:px-4">
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages: n }) => setNumPages(n)}
          loading={
            <div className="flex h-[500px] w-full items-center justify-center">
              <span className="text-sm tracking-wide text-stone-400">Loading…</span>
            </div>
          }
          error={
            <div className="flex h-48 flex-col items-center justify-center gap-3">
              <p className="text-sm text-stone-500">Could not load PDF.</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-stone-700 underline underline-offset-4"
              >
                Open in new tab
              </a>
            </div>
          }
        >
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Prev arrow */}
            <button
              onClick={goPrev}
              disabled={!canGoPrev || numPages === 0}
              aria-label="Previous pages"
              className="flex-shrink-0 rounded-full p-1.5 text-stone-400 transition-colors hover:bg-stone-200 hover:text-stone-700 disabled:pointer-events-none disabled:opacity-20"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            {/* Pages */}
            <div
              className="flex items-stretch"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              }}
            >
              {isCover ? (
                <Page
                  pageNumber={1}
                  width={coverW}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              ) : (
                <>
                  {leftPage !== null && (
                    <>
                      <Page
                        pageNumber={leftPage}
                        width={isTwoPage ? spreadPageW : singlePageW}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                      />
                      {/* Spine shadow between pages */}
                      {rightPage && isTwoPage && (
                        <div
                          aria-hidden
                          className="w-px flex-shrink-0 self-stretch"
                          style={{
                            background:
                              "linear-gradient(to bottom, transparent, rgb(120 113 108 / 0.4) 20%, rgb(120 113 108 / 0.5) 50%, rgb(120 113 108 / 0.4) 80%, transparent)",
                          }}
                        />
                      )}
                    </>
                  )}
                  {rightPage && isTwoPage && (
                    <Page
                      pageNumber={rightPage}
                      width={spreadPageW}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  )}
                </>
              )}
            </div>

            {/* Next arrow */}
            <button
              onClick={goNext}
              disabled={!canGoNext || numPages === 0}
              aria-label="Next pages"
              className="flex-shrink-0 rounded-full p-1.5 text-stone-400 transition-colors hover:bg-stone-200 hover:text-stone-700 disabled:pointer-events-none disabled:opacity-20"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
        </Document>

        {numPages > 0 && (
          <p className="text-xs uppercase tracking-[0.18em] text-stone-400">
            {pageLabel()}
          </p>
        )}
      </div>
    </div>
  );
}
