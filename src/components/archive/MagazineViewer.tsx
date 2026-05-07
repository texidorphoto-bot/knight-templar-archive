"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, Download, ExternalLink } from "lucide-react";
import { CrossPattee } from "@/components/icons/CrossPattee";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const LOADING_STRINGS = [
  "Consulting the codex…",
  "Drawing from the archive…",
  "Turning the page…",
  "Retrieving the record…",
];

type Props = {
  pdfUrl: string;
  title: string;
  downloadName?: string;
};

export function MagazineViewer({ pdfUrl, title, downloadName }: Props) {
  const [numPages, setNumPages] = useState(0);
  const [firstPage, setFirstPage] = useState(1);
  const [containerWidth, setContainerWidth] = useState(900);
  const [loadingText] = useState(
    () => LOADING_STRINGS[Math.floor(Math.random() * LOADING_STRINGS.length)]
  );
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

  const isTwoPage = containerWidth >= 560;
  const isCover = firstPage === 1;

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
      setFirstPage(1);
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

  const spreadPageW = Math.floor((containerWidth - 96) / 2);
  const singlePageW = containerWidth - 80;
  const coverW = Math.min(spreadPageW, 340);

  const pageLabel = () => {
    if (numPages === 0) return "";
    if (isCover) return `Page 1 of ${numPages}`;
    const shown =
      rightPage && isTwoPage ? `${leftPage}–${rightPage}` : `${leftPage}`;
    return `Pages ${shown} of ${numPages}`;
  };

  const filename = downloadName ?? pdfUrl.split("/").pop() ?? "issue.pdf";

  return (
    <div
      className="overflow-hidden bg-cream border border-vellum-warm shadow-parchment"
      style={{ borderRadius: "var(--radius-card)" }}
    >
      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center justify-between gap-3 border-b border-vellum-warm bg-cream px-4 py-3"
      >
        <h2
          className="font-ui text-iron-gall-soft"
          style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          The full issue
        </h2>
        <div className="flex items-center gap-4">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-ui font-medium text-seal-wax no-underline hover:text-templar-red hover:underline"
            style={{ fontSize: "0.875rem", textUnderlineOffset: "3px", transitionDuration: "var(--duration-quick)" }}
          >
            Open in new tab
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={pdfUrl}
            download={filename}
            className="inline-flex items-center gap-1 font-ui font-medium text-seal-wax no-underline hover:text-templar-red hover:underline"
            style={{ fontSize: "0.875rem", textUnderlineOffset: "3px", transitionDuration: "var(--duration-quick)" }}
          >
            Download
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Viewer */}
      <div
        ref={containerRef}
        aria-label={title}
        className="flex flex-col items-center gap-5 px-2 py-8 sm:px-4 bg-vellum"
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages: n }) => setNumPages(n)}
          loading={
            <div className="flex h-[500px] w-full flex-col items-center justify-center gap-4">
              <CrossPattee className="spinner-cross h-10 w-10" aria-hidden="true" />
              <span
                className="font-ui text-cloister-stone"
                style={{ fontSize: "0.8125rem", letterSpacing: "0.04em" }}
              >
                {loadingText}
              </span>
            </div>
          }
          error={
            <div className="flex h-48 flex-col items-center justify-center gap-3">
              <p className="font-body text-iron-gall-soft" style={{ fontSize: "0.9375rem" }}>
                Could not load the issue.
              </p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="font-ui font-medium text-seal-wax underline hover:text-templar-red"
                style={{ fontSize: "0.875rem", textUnderlineOffset: "3px" }}
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
              className="flex-shrink-0 rounded-subtle p-1.5 text-cloister-stone transition-colors hover:bg-vellum-warm hover:text-iron-gall disabled:pointer-events-none disabled:opacity-20"
              style={{ transitionDuration: "var(--duration-quick)" }}
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            {/* Pages */}
            <div
              className="flex items-stretch"
              style={{
                boxShadow:
                  "0 4px 6px -1px rgba(27, 20, 14, 0.2), 0 2px 4px -2px rgba(27, 20, 14, 0.12)",
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
                      {rightPage && isTwoPage && (
                        <div
                          aria-hidden
                          className="w-px flex-shrink-0 self-stretch"
                          style={{
                            background:
                              "linear-gradient(to bottom, transparent, rgba(27, 20, 14, 0.3) 20%, rgba(27, 20, 14, 0.4) 50%, rgba(27, 20, 14, 0.3) 80%, transparent)",
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
              className="flex-shrink-0 rounded-subtle p-1.5 text-cloister-stone transition-colors hover:bg-vellum-warm hover:text-iron-gall disabled:pointer-events-none disabled:opacity-20"
              style={{ transitionDuration: "var(--duration-quick)" }}
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
        </Document>

        {numPages > 0 && (
          <p
            className="font-ui text-cloister-stone"
            style={{ fontSize: "0.75rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
          >
            {pageLabel()}
          </p>
        )}
      </div>
    </div>
  );
}
