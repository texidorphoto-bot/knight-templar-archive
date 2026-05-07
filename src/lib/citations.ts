import type { Issue } from "@/lib/types";

const PUBLISHER = "Laughing Lion LLC";
const PUBLISHER_PLACE = "Littleton, CO";
const JOURNAL_TITLE = "Knight Templar";
const CORPORATE_AUTHOR =
  "Grand Encampment of Knights Templar of the United States of America";

function issueLabel(issue: Issue): string {
  if (issue.issueNumber) return issue.issueNumber;
  if (issue.month && issue.year) return `${issue.month} ${issue.year}`;
  return issue.publicationDate.slice(0, 7);
}

/**
 * Chicago 17th edition — periodical / corporate serial.
 * Format: Author. *Title*, vol. VOLUME (SEASON YEAR). Place: Publisher.
 */
export function formatChicago(issue: Issue): string {
  const vol = issue.volume ? `, vol. ${issue.volume}` : "";
  const season = issueLabel(issue);
  return `${CORPORATE_AUTHOR}. *${JOURNAL_TITLE}*${vol} (${season}). ${PUBLISHER_PLACE}: ${PUBLISHER}.`;
}

/**
 * MLA 9th edition — periodical entry.
 * Format: *Title*. Vol. VOLUME, SEASON YEAR, Publisher.
 */
export function formatMLA(issue: Issue): string {
  const vol = issue.volume ? `Vol. ${issue.volume}, ` : "";
  const season = issueLabel(issue);
  return `*${JOURNAL_TITLE}*. ${vol}${season}, ${PUBLISHER}.`;
}

/**
 * Turabian 9th edition — notes-bibliography style.
 * Format: Author. "Title." SEASON YEAR. Vol. VOLUME.
 */
export function formatTurabian(issue: Issue): string {
  const season = issueLabel(issue);
  const vol = issue.volume ? ` Vol. ${issue.volume}.` : "";
  return `${CORPORATE_AUTHOR}. "${JOURNAL_TITLE}." ${season}.${vol} ${PUBLISHER_PLACE}: ${PUBLISHER}.`;
}

export type CitationFormat = "chicago" | "mla" | "turabian";

export const CITATION_FORMATS: Array<{ id: CitationFormat; label: string }> = [
  { id: "chicago", label: "Chicago 17th" },
  { id: "mla", label: "MLA 9th" },
  { id: "turabian", label: "Turabian 9th" },
];

export function getCitation(issue: Issue, format: CitationFormat): string {
  switch (format) {
    case "chicago":
      return formatChicago(issue);
    case "mla":
      return formatMLA(issue);
    case "turabian":
      return formatTurabian(issue);
  }
}
