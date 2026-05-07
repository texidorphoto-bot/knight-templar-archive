"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCodex } from "@/hooks/useCodex";
import { IssueGrid } from "@/components/archive/IssueGrid";
import { CrossPattee } from "@/components/icons/CrossPattee";
import issuesJson from "@/data/issues.json";
import type { Issue } from "@/lib/types";

const ALL_ISSUES = issuesJson as Issue[];

export default function CodexPage() {
  const { saved, mounted } = useCodex();

  const savedIssues = useMemo(
    () => ALL_ISSUES.filter((issue) => saved.has(issue.slug)),
    [saved]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 font-ui font-medium text-seal-wax no-underline hover:text-templar-red hover:underline"
        style={{ fontSize: "0.875rem", textUnderlineOffset: "3px", transitionDuration: "var(--duration-quick)" }}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to archive
      </Link>

      <section className="mb-10" style={{ maxWidth: "var(--max-reading)" }}>
        <p className="overline mb-3">Your Collection</p>
        <h1
          className="font-display font-medium text-iron-gall text-balance"
          style={{ fontSize: "var(--text-h1)", lineHeight: 1.1 }}
        >
          Codex
        </h1>
        <p
          className="mt-4 font-body text-iron-gall-soft leading-relaxed"
          style={{ fontSize: "var(--text-body-large)" }}
        >
          Issues you have inscribed here are saved to this device.
        </p>
      </section>

      {!mounted ? null : savedIssues.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center bg-cream text-center"
          style={{
            border: "1px dashed var(--color-illumination)",
            borderRadius: "var(--radius-card)",
            padding: "var(--space-9) var(--space-6)",
          }}
        >
          <div className="mb-5" style={{ opacity: 0.3 }}>
            <CrossPattee className="h-10 w-10 text-templar-red" aria-hidden="true" />
          </div>
          <h2
            className="font-display font-medium text-iron-gall"
            style={{ fontSize: "var(--text-h3)" }}
          >
            Your Codex is unmarked.
          </h2>
          <p
            className="mt-2 font-body text-iron-gall-soft"
            style={{ fontSize: "var(--text-body)", maxWidth: "38ch" }}
          >
            Items you save will be inscribed here.
          </p>
          <Link
            href="/"
            className="mt-6 font-ui font-medium text-seal-wax no-underline hover:text-templar-red hover:underline"
            style={{ fontSize: "0.875rem", textUnderlineOffset: "3px" }}
          >
            Browse the archive
          </Link>
        </div>
      ) : (
        <IssueGrid issues={savedIssues} />
      )}
    </div>
  );
}
