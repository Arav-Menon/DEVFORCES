"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { UserSubmission } from "@/utils/admin_api/api";

const statusColor: Record<string, string> = {
  Accepted: "text-green-400 bg-green-400/10",
  Pending: "text-yellow-400 bg-yellow-400/10",
  Processing: "text-blue-400 bg-blue-400/10",
  "Wrong Answer": "text-red-400 bg-red-400/10",
  "Runtime Error": "text-orange-400 bg-orange-400/10",
  "Time Limit Exceeded": "text-yellow-400 bg-yellow-400/10",
};

const statuses = ["All", "Accepted", "Pending", "Processing"] as const;

interface SubmissionListProps {
  submissions: UserSubmission[];
}

export function SubmissionList({ submissions }: SubmissionListProps) {
  const [filter, setFilter] = useState<string>("All");

  const filtered = submissions.filter((s) => {
    return filter === "All" || s.status === filter;
  });

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Recent Activity</h3>
          <Link href="/submissions" className="text-xs text-blue-400 hover:text-blue-300 transition flex items-center gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filter === s
                  ? "bg-zinc-700 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs font-medium text-zinc-500 px-6 py-3">Problem</th>
              <th className="text-left text-xs font-medium text-zinc-500 px-6 py-3">Contest</th>
              <th className="text-left text-xs font-medium text-zinc-500 px-6 py-3">Status</th>
              <th className="text-left text-xs font-medium text-zinc-500 px-6 py-3">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {filtered.map((sub) => (
              <tr key={sub.id} className="hover:bg-zinc-800/30 transition">
                <td className="px-6 py-3">
                  <span className="text-sm font-medium text-white">
                    {sub.problemTitle}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <Link href={`/contests/${sub.contestSlug}`} className="text-sm text-zinc-400 hover:text-blue-400 transition">
                    {sub.contestTitle}
                  </Link>
                </td>
                <td className="px-6 py-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[sub.status] || "text-zinc-400 bg-zinc-400/10"}`}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-zinc-500">{formatTime(sub.submittedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-zinc-500">
            No submissions yet. Start solving problems!
          </div>
        )}
      </div>
    </div>
  );
}
