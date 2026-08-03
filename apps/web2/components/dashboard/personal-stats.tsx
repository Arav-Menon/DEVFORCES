"use client";

import { StatsCard } from "@/components/dashboard/stats-card";
import { Trophy, Target, Flame, BarChart3 } from "lucide-react";
import type { UserStats } from "@/utils/admin_api/api";

interface PersonalStatsProps {
  userStats: UserStats | null;
}

export function PersonalStats({ userStats }: PersonalStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        icon={Trophy}
        label="Rating"
        value={userStats?.rating || 0}
        trend={{ value: 23, isPositive: true }}
      />
      <StatsCard
        icon={Target}
        label="Problems Solved"
        value={userStats?.problemsSolved || 0}
        suffix={`/ ${userStats?.totalProblems || 500}`}
      />
      <StatsCard
        icon={Flame}
        label="Day Streak"
        value={userStats?.streak || 0}
        suffix="days"
      />
      <StatsCard
        icon={BarChart3}
        label="Global Rank"
        value={`#${userStats?.rank || 0}`}
        trend={{ value: 12, isPositive: true }}
      />
    </div>
  );
}
