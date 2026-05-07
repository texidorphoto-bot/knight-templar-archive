import Link from "next/link";
import { CrossPattee } from "@/components/icons/CrossPattee";

export function SiteFooter() {
  return (
    <footer
      className="mt-16 border-t border-vellum-warm bg-vellum"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand block */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <CrossPattee
                className="h-5 w-5 text-templar-red"
                aria-hidden="true"
              />
              <span
                className="font-display font-medium text-iron-gall"
                style={{ fontSize: "0.9375rem", fontVariant: "small-caps", letterSpacing: "0.04em" }}
              >
                The Templar Archive
              </span>
            </div>
            <p
              className="font-body text-iron-gall-soft leading-relaxed"
              style={{ fontSize: "0.9375rem", maxWidth: "36ch" }}
            >
              A research archive of{" "}
              <em>Knight Templar</em>, the quarterly publication of the Grand
              Encampment of Knights Templar of the United States of America.
            </p>
          </div>

          {/* Footer navigation */}
          <nav
            aria-label="Footer"
            className="flex flex-col gap-2"
          >
            <Link
              href="/"
              className="font-ui text-iron-gall-soft no-underline transition-colors duration-quick hover:text-iron-gall"
              style={{ fontSize: "0.875rem" }}
            >
              Archive
            </Link>
            <Link
              href="/about"
              className="font-ui text-iron-gall-soft no-underline transition-colors duration-quick hover:text-iron-gall"
              style={{ fontSize: "0.875rem" }}
            >
              About
            </Link>
          </nav>
        </div>

        {/* Gold divider */}
        <hr className="rule-gold my-8" aria-hidden="true" />

        {/* Motto and copyright */}
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="font-ui text-cloister-stone"
            style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Non Nobis, Domine, Non Nobis, Sed Nomini Tuo Da Gloriam
          </p>
          <p
            className="font-ui text-cloister-stone"
            style={{ fontSize: "0.75rem" }}
          >
            &copy; Grand Encampment of Knights Templar of the U.S.A.
          </p>
        </div>
      </div>
    </footer>
  );
}
