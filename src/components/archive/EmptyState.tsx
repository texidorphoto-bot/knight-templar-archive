import Link from "next/link";
import { BookOpen } from "lucide-react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  /** When provided, renders a small reset link below the description. */
  resetHref?: string;
};

export function EmptyState({
  title = "No issues match your filters",
  description = "Try a broader search term, or clear your filters to see the full archive.",
  resetHref = "/",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 text-stone-500">
        <BookOpen className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="font-serif text-xl text-stone-900">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-stone-600">{description}</p>
      {resetHref ? (
        <Link
          href={resetHref}
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-stone-800 underline underline-offset-4 hover:text-stone-950"
        >
          Clear filters
        </Link>
      ) : null}
    </div>
  );
}
