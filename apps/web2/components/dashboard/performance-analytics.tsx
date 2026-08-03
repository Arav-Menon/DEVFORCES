"use client";

import { RatingChart } from "@/components/dashboard/rating-chart";
import { SubmissionsChart } from "@/components/dashboard/submissions-chart";
import { DifficultyChart } from "@/components/dashboard/difficulty-chart";
import type { RatingHistory } from "@/utils/admin_api/api";

interface PerformanceAnalyticsProps {
  ratingHistory: RatingHistory[];
}

export function PerformanceAnalytics({ ratingHistory }: PerformanceAnalyticsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-white">Performance Analytics</h2>
      <RatingChart ratingHistory={ratingHistory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SubmissionsChart />
        <DifficultyChart />
      </div>
    </div>
  );
}
