import Link from "next/link";
import { BookOpen } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-stone-200 bg-stone-50/80 backdrop-blur supports-[backdrop-filter]:bg-stone-50/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3" aria-label="Home">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 shadow-sm transition-colors group-hover:border-stone-700"
          >
            <BookOpen className="h-4 w-4" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg text-stone-900">
              Knight&rsquo;s Templar Magazine
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-stone-500">
              Digital Archive
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-5 text-sm">
          <Link
            href="/"
            className="text-stone-700 underline-offset-4 hover:text-stone-950 hover:underline"
          >
            Archive
          </Link>
          <Link
            href="/about"
            className="text-stone-700 underline-offset-4 hover:text-stone-950 hover:underline"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
