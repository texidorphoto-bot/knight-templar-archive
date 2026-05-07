import Link from "next/link";
import { cn } from "@/lib/utils";

type TopicBadgeProps = {
  topic: string;
  href?: string;
  className?: string;
};

export function TopicBadge({ topic, href, className }: TopicBadgeProps) {
  const base =
    "inline-flex items-center border border-vellum-warm bg-vellum font-ui text-iron-gall-soft transition-colors";
  const styles = cn(
    base,
    href && "hover:border-illumination hover:text-iron-gall cursor-pointer",
    className
  );

  const inlineStyles = {
    fontSize: "0.75rem",
    padding: "0.1875rem 0.625rem",
    borderRadius: "var(--radius-pill)",
    transitionDuration: "var(--duration-quick)",
    transitionTimingFunction: "var(--ease-quick)",
  };

  if (href) {
    return (
      <Link href={href} className={styles} style={inlineStyles}>
        {topic}
      </Link>
    );
  }

  return (
    <span className={styles} style={inlineStyles}>
      {topic}
    </span>
  );
}
