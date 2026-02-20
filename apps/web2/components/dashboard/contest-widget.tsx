"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Trophy, ExternalLink } from "lucide-react";

interface ContestWidgetProps {
  title: string;
  slug: string;
  startTime: string;
  status: "UPCOMING" | "ONGOING" | "ENDED";
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function getStatusConfig(status: ContestWidgetProps["status"]) {
  switch (status) {
    case "ONGOING":
      return {
        label: "Live Now",
        color: "text-green-400",
        bg: "bg-green-500/10 border-green-500/30",
        dot: "bg-green-400 animate-pulse",
      };
    case "UPCOMING":
      return {
        label: "Upcoming",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10 border-yellow-500/30",
        dot: "bg-yellow-400",
      };
    case "ENDED":
      return {
        label: "Ended",
        color: "text-zinc-400",
        bg: "bg-zinc-500/10 border-zinc-500/30",
        dot: "bg-zinc-400",
      };
  }
}

export function ContestWidget({ title, slug, startTime, status }: ContestWidgetProps) {
  const statusConfig = getStatusConfig(status);

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-8 transition hover:border-zinc-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1 min-w-0 mr-4">
          <h3 className="text-2xl font-bold text-white truncate">{title}</h3>
          <span className="text-zinc-500 text-sm font-mono">/{slug}</span>
        </div>
        <Trophy className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
      </div>

      {/* Status badge */}
      <div className="mb-5">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold ${statusConfig.bg} ${statusConfig.color}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
          {statusConfig.label}
        </span>
      </div>

      {/* Info row */}
      <div className="flex items-center gap-3 text-zinc-400 mb-6">
        <Clock className="w-4 h-4 text-zinc-200 flex-shrink-0" />
        <span className="text-sm">
          {status === "UPCOMING" ? "Starts" : "Started"}:{" "}
          <span className="text-white font-semibold">{formatDate(startTime)}</span>
        </span>
      </div>

      {/* CTA */}
      <Link href={`/contests/${slug}`}>
        <Button className="w-full bg-white/90 hover:bg-white/80 text-zinc-900 font-semibold">
          {status === "ONGOING" ? "Enter Contest" : status === "UPCOMING" ? "View Details" : "See Results"}
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
}
