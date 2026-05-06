import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-stone-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-1">
          <p className="font-serif text-base text-stone-900">
            Knight&rsquo;s Templar Magazine — Digital Archive
          </p>
          <p>
            A research database of <em>Knight Templar</em>, the quarterly publication of the
            Grand Encampment of Knights Templar of the United States of America.
          </p>
        </div>
        <nav aria-label="Footer" className="flex items-center gap-5">
          <Link
            href="/"
            className="underline-offset-4 hover:text-stone-950 hover:underline"
          >
            Archive
          </Link>
          <Link
            href="/about"
            className="underline-offset-4 hover:text-stone-950 hover:underline"
          >
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}
