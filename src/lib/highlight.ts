import React from "react";

/**
 * Split `text` around occurrences of any token in `query` and wrap each match
 * in a <mark> element. Returns a React.ReactNode so it can be rendered inline.
 *
 * - Case-insensitive matching.
 * - Multi-token: "holy land" highlights "holy" and "land" separately.
 * - Returns plain text (no fragments) when query is empty.
 */
export function highlightTerms(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;

  const tokens = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); // escape regex chars

  if (tokens.length === 0) return text;

  const pattern = new RegExp(`(${tokens.join("|")})`, "gi");
  const parts = text.split(pattern);

  if (parts.length === 1) return text;

  return React.createElement(
    React.Fragment,
    null,
    ...parts.map((part, i) =>
      pattern.test(part)
        ? React.createElement("mark", { key: i }, part)
        : part
    )
  );
}
