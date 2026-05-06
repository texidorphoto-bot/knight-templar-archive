import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "About the Knight's Templar Magazine Digital Archive — sources, contribution, and how the archive is maintained.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-stone-700 underline-offset-4 hover:text-stone-950 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to archive
      </Link>

      <p className="mb-3 text-xs uppercase tracking-[0.22em] text-stone-500">About</p>
      <h1 className="font-serif text-4xl leading-tight text-stone-900 text-balance sm:text-5xl">
        A research database of <em>Knight Templar</em> magazine.
      </h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-stone-700">
        <p>
          The Knight&rsquo;s Templar Magazine Digital Archive is a searchable home for back
          issues of <em>Knight Templar</em>, the quarterly publication of the Grand
          Encampment of Knights Templar of the United States of America. The magazine has
          been published continuously across decades, and is currently produced by
          Laughing Lion LLC under managing editor Ben Williams.
        </p>
        <p>
          Each issue in the archive includes a cover thumbnail, publication date, volume
          and issue label, an editorial summary, the cover-feature article list, the
          topical tags we use to navigate the collection, and the full PDF for in-browser
          reading or download.
        </p>

        <h2 className="font-serif text-2xl text-stone-900">How the archive is sourced</h2>
        <p>
          Issues are added one at a time. Each PDF is dropped into the project&rsquo;s
          assets folder, a cover thumbnail is generated from page one, the body text is
          extracted for search, and the metadata record is written to the seed JSON. As
          the collection grows, that workflow will move out of the source tree and into a
          managed database with object storage, but the visible experience will not
          change.
        </p>

        <h2 className="font-serif text-2xl text-stone-900">Contributing a missing issue</h2>
        <p>
          If you have an issue we are missing, please contact the project maintainer. We
          accept original PDFs, scanned PDFs, and (with permission) digital reproductions
          from official Templar sources. Scanned issues without a text layer will be
          re-processed with OCR before they appear in search results.
        </p>

        <h2 className="font-serif text-2xl text-stone-900">A note on attribution</h2>
        <p>
          <em>Knight Templar</em> is the property of the Grand Encampment of Knights
          Templar of the United States of America. This archive is a research and reading
          aid; original copyright remains with the publishers and authors.
        </p>
      </div>
    </div>
  );
}
