import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Issue } from "@/lib/types";

type IssueNavigatorProps = {
  prev: Issue | null;
  next: Issue | null;
};

export function IssueNavigator({ prev, next }: IssueNavigatorProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Adjacent issues"
      className="flex items-stretch justify-between gap-4 border border-vellum-warm bg-cream shadow-parchment"
      style={{ borderRadius: "var(--radius-card)" }}
    >
      {/* Previous issue */}
      <div className="flex-1">
        {prev ? (
          <Link
            href={`/issues/${prev.slug}`}
            className="group flex h-full items-center gap-3 px-5 py-4 no-underline transition-colors hover:bg-vellum-warm"
            style={{
              borderRadius: "var(--radius-card) 0 0 var(--radius-card)",
              transitionDuration: "var(--duration-quick)",
            }}
          >
            <ChevronLeft
              className="h-5 w-5 flex-shrink-0 text-cloister-stone transition-colors group-hover:text-templar-red"
              style={{ transitionDuration: "var(--duration-quick)" }}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-0.5">
              <span
                className="font-ui text-cloister-stone"
                style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                Previous issue
              </span>
              <span
                className="font-body text-iron-gall"
                style={{ fontSize: "0.875rem", lineHeight: 1.35 }}
              >
                {prev.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="h-full" aria-hidden="true" />
        )}
      </div>

      {/* Divider */}
      <div
        className="w-px self-stretch"
        style={{ background: "var(--color-vellum-warm)" }}
        aria-hidden="true"
      />

      {/* Next issue */}
      <div className="flex-1">
        {next ? (
          <Link
            href={`/issues/${next.slug}`}
            className="group flex h-full items-center justify-end gap-3 px-5 py-4 text-right no-underline transition-colors hover:bg-vellum-warm"
            style={{
              borderRadius: "0 var(--radius-card) var(--radius-card) 0",
              transitionDuration: "var(--duration-quick)",
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span
                className="font-ui text-cloister-stone"
                style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
              >
                Next issue
              </span>
              <span
                className="font-body text-iron-gall"
                style={{ fontSize: "0.875rem", lineHeight: 1.35 }}
              >
                {next.title}
              </span>
            </div>
            <ChevronRight
              className="h-5 w-5 flex-shrink-0 text-cloister-stone transition-colors group-hover:text-templar-red"
              style={{ transitionDuration: "var(--duration-quick)" }}
              aria-hidden="true"
            />
          </Link>
        ) : (
          <div className="h-full" aria-hidden="true" />
        )}
      </div>
    </nav>
  );
}
