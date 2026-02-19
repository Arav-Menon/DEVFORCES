"use client";

import Link from "next/link";
import { TrendingUp } from "lucide-react";

interface RatingData {
  day: number;
  rating: number;
}

interface RatingChartProps {
  username: string;
  currentRating: number;
  data: RatingData[];
}

export function RatingChart({
  username,
  currentRating,
  data,
}: RatingChartProps) {
  const minRating = Math.min(...data.map((d) => d.rating));
  const maxRating = Math.max(...data.map((d) => d.rating));
  const range = maxRating - minRating || 1;

  return (
    <Link href={`/profile/${username}`}>
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-950 transition cursor-pointer mb-4 ">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-zinc-400 text-sm mb-1">Your Rating</p>
            <h3 className="text-3xl font-bold text-blue-400">
              {currentRating}
            </h3>
          </div>
          <TrendingUp className="w-6 h-6 text-green-400" />
        </div>

        {/* Sparkline Chart */}
        <div className="flex items-end justify-between gap-1 h-16 mb-4">
          {data.map((point, idx) => {
            const height = ((point.rating - minRating) / range) * 100;
            return (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t opacity-70 hover:opacity-100 transition"
                style={{ height: `${Math.max(height, 5)}%` }}
                title={`Day ${point.day}: ${point.rating}`}
              />
            );
          })}
        </div>

        <p className="text-xs text-zinc-400">Last 30 days</p>
      </div>
    </Link>
  );
}
