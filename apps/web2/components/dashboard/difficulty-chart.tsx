"use client";

import { mockDifficultyDistribution } from "@/components/dashboard/mock-data";

export function DifficultyChart() {
  const total = mockDifficultyDistribution.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h3 className="text-sm font-medium text-zinc-400">Difficulty Distribution</h3>
      </div>
      <div className="p-6">
        {/* Stacked bar */}
        <div className="flex h-4 rounded-full overflow-hidden mb-4">
          {mockDifficultyDistribution.map((d) => (
            <div
              key={d.name}
              className="transition-all duration-500 hover:opacity-80"
              style={{
                width: `${(d.value / total) * 100}%`,
                backgroundColor: d.color,
              }}
            />
          ))}
        </div>
        {/* Legend */}
        <div className="flex flex-col gap-2.5">
          {mockDifficultyDistribution.map((d) => (
            <div key={d.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-sm text-zinc-300">{d.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{d.value}</span>
                <span className="text-xs text-zinc-500">({Math.round((d.value / total) * 100)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
