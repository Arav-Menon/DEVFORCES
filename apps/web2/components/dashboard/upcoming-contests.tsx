"use client";

import Link from "next/link";
import { Calendar, Users, Code, ArrowRight } from "lucide-react";
import type { UpcomingContest } from "@/utils/admin_api/api";

interface UpcomingContestsProps {
  contests: UpcomingContest[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return "Now";
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `in ${days}d`;
  const hours = Math.floor((diff % 86400000) / 3600000);
  return `in ${hours}h`;
}

export function UpcomingContests({ contests }: UpcomingContestsProps) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Upcoming Contests</h3>
        <Link href="/contests" className="text-xs text-blue-400 hover:text-blue-300 transition flex items-center gap-1">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="divide-y divide-zinc-800">
        {contests.length > 0 ? (
          contests.map((contest) => (
            <div key={contest.id} className="px-6 py-4 hover:bg-zinc-800/30 transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-white">{contest.title}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{formatDate(contest.startTime)}</p>
                </div>
                <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-2 py-0.5 rounded-full">
                  {timeUntil(contest.startTime)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{contest.participants}</span>
                <span className="flex items-center gap-1"><Code className="w-3 h-3" />{contest.challenges} challenges</span>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-8 text-center text-sm text-zinc-500">
            No upcoming contests
          </div>
        )}
      </div>
    </div>
  );
}
