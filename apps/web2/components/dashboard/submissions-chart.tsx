"use client";

import { mockSubmissionsByDay } from "@/components/dashboard/mock-data";

export function SubmissionsChart() {
  const maxCount = Math.max(...mockSubmissionsByDay.map((d) => d.count));
  const total = mockSubmissionsByDay.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-zinc-400">Submissions This Week</h3>
          <span className="text-xs text-zinc-500">{total} total</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-end gap-2 h-[140px]">
          {mockSubmissionsByDay.map((day) => {
            const height = (day.count / maxCount) * 100;
            return (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100">{day.count}</span>
                <div
                  className="w-full rounded-t bg-blue-500/70 hover:bg-blue-400 transition-all duration-150 min-h-[4px] group relative"
                  style={{ height: `${Math.max(height, 5)}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                    {day.count} submissions
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500">{day.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
