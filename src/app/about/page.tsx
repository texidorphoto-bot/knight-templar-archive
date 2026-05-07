import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "About The Templar Archive: how issues enter the record, and how to contribute one we are missing.",
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
        Return to the Archive
      </Link>

      <p className="overline mb-3">About</p>
      <h1
        className="font-display font-medium text-iron-gall text-balance"
        style={{ fontSize: "var(--text-h1)", lineHeight: 1.1 }}
      >
        Keeping the record.
      </h1>

      <div
        className="mt-10 font-body text-iron-gall-soft leading-relaxed"
        style={{ fontSize: "var(--text-body-large)" }}
      >
        <p className="mb-5">
          The Templar Archive is the official home for back issues of Knights Templar
          Magazine, the quarterly publication of the Grand Encampment of Knights
          Templar of the United States of America. Published continuously for more
          than seventy volumes and now produced by Laughing Lion LLC under managing
          editor Ben Williams, the magazine reaches over 65,000 households nationwide.
          This archive keeps every issue in one place: searchable, readable, citable,
          and built to last.
        </p>
        <p className="mb-8">
          Each issue carries a cover, publication date, volume and issue label, an
          editorial summary, the cover-feature article list, topical tags, and the
          full issue itself, ready to read or download.
        </p>

        <h2
          className="font-display font-medium text-iron-gall mb-4"
          style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}
        >
          How issues enter the record
        </h2>
        <p className="mb-8">
          Issues enter the archive one at a time. The publication is given a permanent
          home, a cover is taken from page one, the body text is extracted so the
          issue can be searched, and a metadata record is added to the catalog. As the
          catalog grows, this workflow moves to a managed database and object storage;
          the visible experience does not change.
        </p>

        <h2
          className="font-display font-medium text-iron-gall mb-4"
          style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}
        >
          If you have an issue we are missing
        </h2>
        <p className="mb-8">
          If you hold an issue not yet in the archive, please contact the project
          maintainer. Original PDFs, scanned PDFs, and digital reproductions from
          official Templar sources are all welcome. Scanned issues without a text
          layer will be recovered with OCR before they appear in search results.
        </p>

        <h2
          className="font-display font-medium text-iron-gall mb-4"
          style={{ fontSize: "var(--text-h2)", lineHeight: 1.15 }}
        >
          Custody and copyright
        </h2>
        <p>
          Knights Templar Magazine is the property of the Grand Encampment of Knights
          Templar of the United States of America. This archive serves the publication
          as custodian and reading aid; original copyright remains with the publishers
          and authors.
        </p>
      </div>
    </div>
  );
}
