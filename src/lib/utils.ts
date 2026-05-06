import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` merges Tailwind class names safely, deduping conflicting utilities.
 * Use this whenever a component composes classes from props or conditionals.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format an ISO publication date for human display.
 * Falls back to the raw string if parsing fails.
 */
export function formatPublicationDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Short form of the publication date for compact card layouts.
 * Example: "Spring 2025", "March 2025".
 */
export function formatPublicationLabel(
  iso: string,
  fallbackMonth?: string | null,
  year?: number | null
): string {
  const date = new Date(iso);
  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }
  if (fallbackMonth && year) return `${fallbackMonth} ${year}`;
  if (year) return String(year);
  return iso;
}
