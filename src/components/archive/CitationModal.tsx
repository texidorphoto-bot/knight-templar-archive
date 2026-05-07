"use client";

import { useState, useEffect, useRef } from "react";
import { X, Copy, BookOpen } from "lucide-react";
import type { Issue } from "@/lib/types";
import { getCitation, CITATION_FORMATS, type CitationFormat } from "@/lib/citations";
import { CrossPattee } from "@/components/icons/CrossPattee";

type CitationModalProps = {
  issue: Issue;
  open: boolean;
  onClose: () => void;
};

export function CitationModal({ issue, open, onClose }: CitationModalProps) {
  const [format, setFormat] = useState<CitationFormat>("chicago");
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const citation = getCitation(issue, format);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(citation.replace(/\*/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select the text
    }
  }

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex items-start justify-center px-4 pt-[10vh]"
      style={{ background: "rgba(27, 20, 14, 0.6)", animation: "ink-bleed var(--duration-deliberate) var(--ease-out-soft)" }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="citation-modal-title"
    >
      <div
        className="w-full max-w-xl bg-cream shadow-elevated"
        style={{
          borderTop: "4px solid var(--color-templar-red)",
          borderRadius: "var(--radius-card)",
          padding: "var(--space-7)",
          animation: "manuscript-reveal var(--duration-deliberate) var(--ease-ceremonial)",
        }}
      >
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="h-5 w-5 text-templar-red" aria-hidden="true" />
            <h2
              id="citation-modal-title"
              className="font-display font-medium text-iron-gall"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Cite this record
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close citation modal"
            className="flex-shrink-0 rounded-subtle p-1 text-cloister-stone transition-colors hover:bg-vellum-warm hover:text-iron-gall"
            style={{ transitionDuration: "var(--duration-quick)" }}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Issue label */}
        <p
          className="mb-5 font-ui text-cloister-stone"
          style={{ fontSize: "0.8125rem", letterSpacing: "0.04em" }}
        >
          {issue.title}
        </p>

        {/* Format tabs */}
        <div
          className="mb-4 flex gap-1 border border-vellum-warm bg-vellum p-1"
          style={{ borderRadius: "var(--radius-card)" }}
          role="tablist"
          aria-label="Citation format"
        >
          {CITATION_FORMATS.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={format === id}
              onClick={() => setFormat(id)}
              className="flex-1 font-ui font-medium transition-colors"
              style={{
                fontSize: "0.8125rem",
                padding: "0.375rem 0.5rem",
                borderRadius: "2px",
                transitionDuration: "var(--duration-quick)",
                background: format === id ? "var(--color-cream)" : "transparent",
                color: format === id ? "var(--color-iron-gall)" : "var(--color-stone)",
                boxShadow: format === id ? "var(--shadow-parchment)" : "none",
                border: format === id ? "1px solid var(--color-vellum-warm)" : "1px solid transparent",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Citation text */}
        <div
          className="relative rounded font-mono text-iron-gall-soft bg-vellum border border-vellum-warm"
          style={{ fontSize: "0.875rem", lineHeight: 1.65, padding: "var(--space-4)" }}
        >
          {/* Render *italics* as italic spans */}
          {citation.split(/\*([^*]+)\*/g).map((part, i) =>
            i % 2 === 1
              ? <em key={i} style={{ fontFamily: "var(--font-body)", fontStyle: "italic" }}>{part}</em>
              : part
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 font-ui font-semibold transition-colors"
          style={{
            background: copied ? "var(--color-success)" : "var(--color-templar-red)",
            color: "var(--color-vellum)",
            border: "none",
            borderRadius: "var(--radius-subtle)",
            padding: "var(--space-3) var(--space-5)",
            fontSize: "0.875rem",
            cursor: "pointer",
            transitionDuration: "var(--duration-quick)",
          }}
          onMouseEnter={(e) => {
            if (!copied) e.currentTarget.style.background = "var(--color-templar-red-dark)";
          }}
          onMouseLeave={(e) => {
            if (!copied) e.currentTarget.style.background = "var(--color-templar-red)";
          }}
        >
          {copied ? (
            <>
              <CrossPattee className="h-4 w-4 seal-stamp" aria-hidden="true" />
              Copied to clipboard
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Copy citation
            </>
          )}
        </button>
      </div>
    </div>
  );
}
