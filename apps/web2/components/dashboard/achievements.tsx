"use client";

import {
  Code,
  Flame,
  Target,
  Trophy,
  Zap,
  Bug,
  Star,
  Crown,
  Lock,
  CheckCircle2,
} from "lucide-react";
import type { UserStats } from "@/utils/admin_api/api";

interface AchievementsProps {
  userStats: UserStats | null;
}

const allAchievements = [
  { id: "1", title: "First Blood", description: "Solve your first problem", icon: "Code", requirement: (stats: UserStats | null) => (stats?.acceptedSubmissions || 0) >= 1 },
  { id: "2", title: "7-Day Streak", description: "Solve problems 7 days in a row", icon: "Flame", requirement: (stats: UserStats | null) => (stats?.streak || 0) >= 7 },
  { id: "3", title: "Century Club", description: "Solve 100 problems", icon: "Target", requirement: (stats: UserStats | null) => (stats?.problemsSolved || 0) >= 100 },
  { id: "4", title: "Contest Player", description: "Join a contest", icon: "Trophy", requirement: (stats: UserStats | null) => (stats?.contestsPlayed || 0) >= 1 },
  { id: "5", title: "Speed Demon", description: "Solve 5 problems in one day", icon: "Zap", requirement: (stats: UserStats | null) => (stats?.problemsSolved || 0) >= 5 },
  { id: "6", title: "Bug Hunter", description: "Submit 50 solutions", icon: "Bug", requirement: (stats: UserStats | null) => (stats?.totalSubmissions || 0) >= 50 },
  { id: "7", title: "500 Club", description: "Solve 500 problems", icon: "Star", requirement: (stats: UserStats | null) => (stats?.problemsSolved || 0) >= 500 },
  { id: "8", title: "Grandmaster", description: "Reach rating 2400+", icon: "Crown", requirement: (stats: UserStats | null) => (stats?.rating || 0) >= 2400 },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Flame,
  Target,
  Trophy,
  Zap,
  Bug,
  Star,
  Crown,
};

export function Achievements({ userStats }: AchievementsProps) {
  const achievements = allAchievements.map((a) => ({
    ...a,
    unlocked: a.requirement(userStats),
  }));

  const unlocked = achievements.filter((a) => a.unlocked).length;
  const total = achievements.length;

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Achievements</h3>
          <p className="text-xs text-zinc-500 mt-0.5">{unlocked}/{total} unlocked</p>
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {achievements.map((achievement) => {
          const Icon = iconMap[achievement.icon] || Star;
          return (
            <div
              key={achievement.id}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                achievement.unlocked
                  ? "bg-zinc-800/50 border-zinc-700"
                  : "bg-zinc-900/30 border-zinc-800 opacity-40"
              }`}
            >
              {achievement.unlocked ? (
                <CheckCircle2 className="absolute top-2 right-2 w-3.5 h-3.5 text-green-400" />
              ) : (
                <Lock className="absolute top-2 right-2 w-3.5 h-3.5 text-zinc-600" />
              )}
              <Icon className={`w-8 h-8 ${achievement.unlocked ? "text-yellow-400" : "text-zinc-600"}`} />
              <span className={`text-xs font-semibold text-center ${achievement.unlocked ? "text-white" : "text-zinc-500"}`}>
                {achievement.title}
              </span>
              <span className="text-[10px] text-zinc-500 text-center leading-tight">
                {achievement.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
