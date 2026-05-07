import type { Issue } from "@/lib/types";
import { formatPublicationDate } from "@/lib/utils";

type IssueMetadataProps = {
  issue: Issue;
};

export function IssueMetadata({ issue }: IssueMetadataProps) {
  const rows: Array<{ label: string; value: string }> = [
    {
      label: "Published",
      value: formatPublicationDate(issue.publicationDate),
    },
  ];

  if (issue.volume) {
    rows.push({ label: "Volume", value: issue.volume });
  }
  if (issue.issueNumber) {
    rows.push({ label: "Issue", value: issue.issueNumber });
  }
  if (typeof issue.pageCount === "number") {
    rows.push({ label: "Pages", value: String(issue.pageCount) });
  }

  return (
    <table
      className="w-full border-collapse"
      aria-label="Issue metadata"
    >
      <tbody>
        {rows.map((row, index) => (
          <tr
            key={row.label}
            style={{
              borderBottom: index < rows.length - 1 ? "1px dotted var(--color-vellum-warm)" : "none",
            }}
          >
            <th
              scope="row"
              className="font-ui text-left text-cloister-stone"
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.625rem 1rem 0.625rem 0",
                width: "32%",
                verticalAlign: "top",
              }}
            >
              {row.label}
            </th>
            <td
              className="font-body text-iron-gall"
              style={{
                fontSize: "1rem",
                padding: "0.625rem 0",
                verticalAlign: "top",
              }}
            >
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
