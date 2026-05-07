import Link from "next/link";
import { CrossPattee } from "@/components/icons/CrossPattee";

type EmptyStateProps = {
  title?: string;
  description?: string;
  resetHref?: string;
};

export function EmptyState({
  title = "No issues match the search.",
  description = "Adjust the filters or return to the full catalog.",
  resetHref = "/",
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center bg-cream text-center"
      style={{
        border: "1px dashed var(--color-illumination)",
        borderRadius: "var(--radius-card)",
        padding: "var(--space-9) var(--space-6)",
        opacity: 0.9,
      }}
    >
      <div className="mb-5" style={{ opacity: 0.35 }}>
        <CrossPattee className="h-10 w-10 text-templar-red" aria-hidden="true" />
      </div>
      <h3
        className="font-display font-medium text-iron-gall"
        style={{ fontSize: "var(--text-h3)" }}
      >
        {title}
      </h3>
      <p
        className="mt-2 font-body text-iron-gall-soft"
        style={{ fontSize: "var(--text-body)", maxWidth: "38ch" }}
      >
        {description}
      </p>
      {resetHref ? (
        <Link
          href={resetHref}
          className="mt-6 font-ui font-medium text-seal-wax no-underline hover:text-templar-red hover:underline"
          style={{
            fontSize: "0.875rem",
            textUnderlineOffset: "3px",
            transitionDuration: "var(--duration-quick)",
          }}
        >
          Clear filters
        </Link>
      ) : null}
    </div>
  );
}
