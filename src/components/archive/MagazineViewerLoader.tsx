"use client";

import { lazy, Suspense } from "react";

// React.lazy keeps pdfjs-dist in client-only chunks so it never runs
// in the server bundle (pdfjs-dist v5 requires DOMMatrix which Node lacks).
const LazyViewer = lazy(() =>
  import("./MagazineViewer").then((m) => ({ default: m.MagazineViewer }))
);

const Fallback = (
  <div className="flex h-96 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50">
    <span className="text-sm tracking-wide text-stone-400">Loading viewer…</span>
  </div>
);

export function MagazineViewerLoader({
  pdfUrl,
  title,
}: {
  pdfUrl: string;
  title: string;
}) {
  return <Suspense fallback={Fallback}><LazyViewer pdfUrl={pdfUrl} title={title} /></Suspense>;
}
