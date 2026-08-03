"use client";

import { mockSkillTopics } from "@/components/dashboard/mock-data";

export function SkillAnalytics() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h3 className="text-lg font-bold text-white">Skill Analytics</h3>
        <p className="text-xs text-zinc-500 mt-1">Your weakest areas — focus here to improve</p>
      </div>
      <div className="p-6 space-y-4">
        {mockSkillTopics.map((topic) => {
          const barColor =
            topic.accuracy >= 80
              ? "bg-green-500"
              : topic.accuracy >= 50
                ? "bg-yellow-500"
                : "bg-red-500";

          return (
            <div key={topic.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-white">{topic.name}</span>
                <span className="text-xs text-zinc-400">
                  {topic.solved}/{topic.attempted} — <span className={
                    topic.accuracy >= 80 ? "text-green-400" : topic.accuracy >= 50 ? "text-yellow-400" : "text-red-400"
                  }>{topic.accuracy}%</span>
                </span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${topic.accuracy}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
