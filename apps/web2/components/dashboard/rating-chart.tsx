"use client";

import { TrendingUp } from "lucide-react";
import Link from "next/link";
import type { RatingHistory } from "@/utils/admin_api/api";

interface RatingChartProps {
  ratingHistory: RatingHistory[];
}

export function RatingChart({ ratingHistory }: RatingChartProps) {
  const currentRating = ratingHistory.length > 0 ? ratingHistory[ratingHistory.length - 1].rating : 0;
  const firstRating = ratingHistory.length > 0 ? ratingHistory[0].rating : 0;
  const change = Math.round(currentRating - firstRating);

  const ratings = ratingHistory.map((d) => d.rating);
  const minRating = Math.min(...ratings);
  const maxRating = Math.max(...ratings);
  const range = maxRating - minRating || 1;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-medium text-zinc-400">Rating Progress</h3>
          <span className="text-xs text-zinc-500">Last 30 days</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white">{currentRating}</span>
          <span className={`text-sm font-medium flex items-center gap-1 ${change >= 0 ? "text-green-400" : "text-red-400"}`}>
            <TrendingUp className="w-4 h-4" />
            {change >= 0 ? "+" : ""}{change}
          </span>
        </div>
      </div>
      <div className="p-4">
        {ratingHistory.length > 0 ? (
          <div className="flex items-end gap-[2px] h-[140px]">
            {ratingHistory.map((point, i) => {
              const height = ((point.rating - minRating) / range) * 100;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-600/40 to-blue-400/80 hover:from-blue-500/60 hover:to-blue-300 transition-all duration-150 min-h-[4px] group relative"
                  style={{ height: `${Math.max(height, 5)}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                    {point.rating}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-[140px] flex items-center justify-center text-zinc-500 text-sm">
            No rating data yet
          </div>
        )}
        <div className="flex justify-between mt-2 text-[10px] text-zinc-600">
          <span>30d ago</span>
          <span>Today</span>
        </div>
      </div>
      <div className="px-6 pb-4">
        <Link href="/profile" className="text-xs text-blue-400 hover:text-blue-300 transition">
          View full profile →
        </Link>
      </div>
    </div>
  );
}
