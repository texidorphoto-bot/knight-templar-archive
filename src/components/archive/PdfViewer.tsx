import { ExternalLink, Download } from "lucide-react";

type PdfViewerProps = {
  pdfUrl: string;
  title: string;
  /** Optional download filename. Defaults to the URL's basename. */
  downloadName?: string;
};

/**
 * Embedded PDF viewer. Uses a native <iframe> per the brief's
 * recommendation: it's reliable, has no PDF.js worker config to babysit,
 * and respects the browser's built-in PDF UI.
 *
 * If you later want richer per-page navigation, replace this with
 * react-pdf and a custom toolbar — but only after the rest of the
 * archive is solid.
 */
export function PdfViewer({ pdfUrl, title, downloadName }: PdfViewerProps) {
  const filename = downloadName ?? pdfUrl.split("/").pop() ?? "issue.pdf";

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-stone-50 px-4 py-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-stone-700">
          Read full issue
        </h2>
        <div className="flex items-center gap-3 text-sm">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-stone-700 underline-offset-4 hover:text-stone-950 hover:underline"
          >
            Open in new tab
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={pdfUrl}
            download={filename}
            className="inline-flex items-center gap-1 font-medium text-stone-700 underline-offset-4 hover:text-stone-950 hover:underline"
          >
            Download
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
      <iframe
        src={pdfUrl}
        title={title}
        className="h-[85vh] w-full bg-stone-100"
        loading="lazy"
      />
    </div>
  );
}
