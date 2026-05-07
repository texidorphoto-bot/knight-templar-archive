"use client";

import { useCodex } from "@/hooks/useCodex";
import { CrossPattee } from "@/components/icons/CrossPattee";

type CodexButtonProps = {
  slug: string;
  /** "compact" renders icon-only (for cards); "full" shows label (for detail page). */
  variant?: "compact" | "full";
};

export function CodexButton({ slug, variant = "compact" }: CodexButtonProps) {
  const { has, toggle, mounted } = useCodex();

  if (!mounted) {
    return (
      <div
        className="h-8 w-8 rounded-subtle"
        aria-hidden="true"
      />
    );
  }

  const isSaved = has(slug);

  if (variant === "full") {
    return (
      <button
        onClick={() => toggle(slug)}
        className="inline-flex items-center gap-1.5 font-ui font-medium transition-colors"
        style={{
          fontSize: "0.875rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          color: isSaved ? "var(--color-templar-red)" : "var(--color-seal-wax)",
          transitionDuration: "var(--duration-quick)",
        }}
        aria-label={isSaved ? "Strike from Codex" : "Add to Codex"}
        aria-pressed={isSaved}
      >
        <CrossPattee
          className="h-4 w-4"
          aria-hidden="true"
        />
        {isSaved ? "In Codex" : "Add to Codex"}
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className="flex items-center justify-center rounded-subtle transition-colors"
      style={{
        width: "2rem",
        height: "2rem",
        background: isSaved ? "var(--color-templar-red)" : "var(--color-vellum-warm)",
        border: `1px solid ${isSaved ? "var(--color-templar-red)" : "var(--color-border)"}`,
        cursor: "pointer",
        transitionDuration: "var(--duration-quick)",
      }}
      aria-label={isSaved ? "Strike from Codex" : "Add to Codex"}
      aria-pressed={isSaved}
    >
      <span style={{ color: isSaved ? "var(--color-vellum)" : "var(--color-stone)", display: "flex" }}>
        <CrossPattee className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </button>
  );
}
