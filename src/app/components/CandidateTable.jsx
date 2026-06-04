
import { Avatar, Chip, Button } from "@heroui/react";
import Link from "next/link";
import NextLink from "next/link";

const STATUS_CONFIG = {
  Interviewing: { label: "Interviewing", color: "success" },
  Pending:      { label: "New",          color: "default" },
  Reviewing:    { label: "Reviewing",    color: "warning" },
  Rejected:     { label: "Rejected",     color: "danger"  },
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
    year:  "numeric",
  });
}

export async function CandidateTable() {

  const res = await fetch("http://localhost:5000/candidates");
  const candidates = await res.json();

  const recent = candidates
    .sort((a, b) => new Date(b.applicationDate) - new Date(a.applicationDate))
    .slice(0, 5);

  return (
    <div className="w-full rounded-xl bg-content1 p-5 border bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Recent Applications</h2>
        <Link href="/candidate" variant="light" size="sm" className="text-default-500">
          View all
        </Link>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-divider">
            {["Candidate Name", "Role", "Date Applied", "Experience", "Status"].map((h) => (
              <th key={h} className="pb-3 text-left text-xs font-normal text-default-400">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {recent.map((c) => {
            const status = STATUS_CONFIG[c.status] ?? { label: c.status, color: "default" };
            return (
              <tr key={c.id} className="border-b border-divider last:border-0">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={c.profileImage} name={c.name} size="sm" className="shrink-0" />
                    <span className="text-sm font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4 text-sm text-default-500">{c.jobTitle}</td>
                <td className="py-3 pr-4 text-sm text-default-500">{formatDate(c.applicationDate)}</td>
                <td className="py-3 pr-4 text-sm text-default-500">
                  {c.experience} {c.experience === 1 ? "year" : "years"}
                </td>
                <td className="py-3">
                  <Chip color={status.color} variant="flat" size="sm">{status.label}</Chip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}