import Link from "next/link";
import { CrossPattee } from "@/components/icons/CrossPattee";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export function SiteHeader() {
  return (
    <>
      <header
        className="bg-cream border-b border-vellum-warm"
        style={{ height: "64px" }}
      >
        <div
          className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6"
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="The Templar Archive — home"
          >
            <CrossPattee
              className="h-8 w-8 text-templar-red transition-colors duration-quick ease-quick group-hover:text-templar-red-dark"
              aria-hidden="true"
            />
            <span className="flex flex-col leading-tight">
              <span
                className="font-display font-medium text-iron-gall tracking-wide"
                style={{ fontSize: "1.0625rem", fontVariant: "small-caps", letterSpacing: "0.04em" }}
              >
                The Templar Archive
              </span>
              <span
                className="font-ui text-cloister-stone"
                style={{ fontSize: "0.6875rem", letterSpacing: "0.18em", textTransform: "uppercase" }}
              >
                Custodes Memoriae
              </span>
            </span>
          </Link>

          {/* Night mode toggle + Primary navigation */}
          <div className="flex items-center gap-4">
          <ThemeToggle />
          <nav aria-label="Primary" className="flex items-center gap-6">
            <Link
              href="/"
              className="font-ui text-iron-gall-soft no-underline transition-colors duration-quick ease-quick hover:text-iron-gall"
              style={{ fontSize: "0.875rem" }}
            >
              Archive
            </Link>
            <Link
              href="/codex"
              className="font-ui text-iron-gall-soft no-underline transition-colors duration-quick ease-quick hover:text-iron-gall"
              style={{ fontSize: "0.875rem" }}
            >
              Codex
            </Link>
            <Link
              href="/about"
              className="font-ui text-iron-gall-soft no-underline transition-colors duration-quick ease-quick hover:text-iron-gall"
              style={{ fontSize: "0.875rem" }}
            >
              About
            </Link>
          </nav>
          </div>
        </div>
      </header>

      {/* Signature gold rule beneath masthead — appears once per page */}
      <div className="rule-gold w-full" aria-hidden="true" />
    </>
  );
}
