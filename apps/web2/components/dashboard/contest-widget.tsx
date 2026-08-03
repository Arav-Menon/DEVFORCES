"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CountdownTimer } from "@/components/dashboard/countdown-timer";
import { Button } from "@/components/ui/button";
import { Users, Code, ExternalLink } from "lucide-react";

interface ContestWidgetProps {
  title: string;
  slug: string;
  startTime: string;
  status: "UPCOMING" | "ONGOING" | "ENDED";
  participants?: number;
  challenges?: number;
}

const statusConfig = {
  ONGOING: {
    label: "Live Now",
    dot: "bg-green-500 animate-pulse",
    badge: "bg-green-500/10 text-green-400 border-green-500/30",
    border: "border-green-500/30",
  },
  UPCOMING: {
    label: "Upcoming",
    dot: "bg-yellow-500",
    badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    border: "border-zinc-800",
  },
  ENDED: {
    label: "Ended",
    dot: "bg-zinc-500",
    badge: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
    border: "border-zinc-800",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ContestWidget({ title, slug, startTime, status, participants = 0, challenges = 0 }: ContestWidgetProps) {
  const config = statusConfig[status];

  return (
    <div className={`bg-gradient-to-br from-zinc-900 to-zinc-950 border ${config.border} rounded-lg overflow-hidden`}>
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
            <p className="text-sm text-zinc-500">/{slug}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${config.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {config.label}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
          <span>Starts {formatDate(startTime)}</span>
        </div>

        {status === "UPCOMING" && (
          <div className="mb-4">
            <p className="text-xs text-zinc-500 mb-2">Starts in</p>
            <CountdownTimer targetDate={startTime} />
          </div>
        )}

        <div className="flex gap-4 text-sm text-zinc-400 mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{participants} participants</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Code className="w-4 h-4" />
            <span>{challenges} challenges</span>
          </div>
        </div>

        <Link href={`/contests/${slug}`}>
          <Button className={`w-full ${
            status === "ONGOING"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
          }`}>
            {status === "ONGOING" ? "Enter Contest" : status === "UPCOMING" ? "View Details" : "See Results"}
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
