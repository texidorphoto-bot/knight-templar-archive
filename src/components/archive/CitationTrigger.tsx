"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";
import type { Issue } from "@/lib/types";
import { CitationModal } from "@/components/archive/CitationModal";

type CitationTriggerProps = {
  issue: Issue;
};

export function CitationTrigger({ issue }: CitationTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 font-ui font-medium text-seal-wax transition-colors hover:text-templar-red"
        style={{
          fontSize: "0.875rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transitionDuration: "var(--duration-quick)",
        }}
        aria-label={`Cite ${issue.title}`}
      >
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        Cite
      </button>

      <CitationModal issue={issue} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
