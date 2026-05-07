import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "About The Templar Archive — sources, contribution, and how the archive is maintained.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto px-4 py-10 sm:px-6 sm:py-14" style={{ maxWidth: "var(--max-reading)" }}>
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 font-ui font-medium text-seal-wax no-underline hover:text-templar-red hover:underline"
        style={{ fontSize: "0.875rem", textUnderlineOffset: "3px", transitionDuration: "var(--duration-quick)" }}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to archive
      </Link>

      <p className="overline mb-3">About</p>
      <h1
        className="font-display font-medium text-iron-gall text-balance"
        style={{ fontSize: "var(--text-h1)", lineHeight: 1.1 }}
      >
        A research archive of <em style={{ fontFamily: "var(--font-body)", fontStyle: "italic" }}>Knight Templar</em> magazine.
      </h1>

      <div
        className="mt-10 font-body text-iron-gall-soft leading-relaxed"
        style={{ fontSize: "var(--text-body-large)" }}
      >
        <p className="mb-5">
          The Templar Archive is a searchable home for back issues of{" "}
          <em>Knight Templar</em>, the quarterly publication of the Grand Encampment
          of Knights Templar of the United States of America. The magazine has been
          published continuously across decades, and is currently produced by Laughing
          Lion LLC under managing editor Ben Williams.
        </p>
        <p className="mb-8">
          Each issue in the archive includes a cover thumbnail, publication date,
          volume and issue label, an editorial summary, the cover-feature article list,
          topical tags for navigation, and the full PDF for in-browser reading or
          download.
        </p>

        <h2
          className="font-display font-medium text-iron-gall mb-4"
          style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}
        >
          How the archive is sourced
        </h2>
        <p className="mb-8">
          Issues are added one at a time. Each PDF is placed in the archive&rsquo;s
          assets, a cover thumbnail is generated from page one, the body text is
          extracted for search, and the metadata record is written to the catalog.
          As the collection grows, that workflow will move to a managed database with
          object storage; the visible experience will not change.
        </p>

        <h2
          className="font-display font-medium text-iron-gall mb-4"
          style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}
        >
          Contributing a missing issue
        </h2>
        <p className="mb-8">
          If you have an issue not yet in the archive, please contact the project
          maintainer. We accept original PDFs, scanned PDFs, and (with permission)
          digital reproductions from official Templar sources. Scanned issues without
          a text layer will be re-processed with OCR before they appear in search
          results.
        </p>

        <h2
          className="font-display font-medium text-iron-gall mb-4"
          style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}
        >
          A note on attribution
        </h2>
        <p>
          <em>Knight Templar</em> is the property of the Grand Encampment of Knights
          Templar of the United States of America. This archive is a research and
          reading aid; original copyright remains with the publishers and authors.
        </p>
      </div>
    </div>
  );
}
