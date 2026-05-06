import Link from "next/link";
import { cn } from "@/lib/utils";

type TopicBadgeProps = {
  topic: string;
  /** When provided, the badge becomes a link to a filtered archive view. */
  href?: string;
  className?: string;
};

/**
 * Compact pill rendering a topic label. Used on cards, the detail page,
 * and inside the filter bar. Wrap in a Link when used inline so users
 * can drill from a topic to a filtered archive view.
 */
export function TopicBadge({ topic, href, className }: TopicBadgeProps) {
  const styles = cn(
    "inline-flex items-center rounded-full border border-stone-300 bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700 transition-colors",
    href && "hover:border-stone-500 hover:bg-stone-200 hover:text-stone-900",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {topic}
      </Link>
    );
  }

  return <span className={styles}>{topic}</span>;
}
