"use client";

import Link from "next/link";
import { mockQuickActions } from "@/components/dashboard/mock-data";
import {
  BookOpen,
  Trophy,
  FileCode,
  Code,
  BarChart3,
  User,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Trophy,
  FileCode,
  Code,
  BarChart3,
  User,
};

export function QuickActions() {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h3 className="text-lg font-bold text-white">Quick Actions</h3>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {mockQuickActions.map((action) => {
          const Icon = iconMap[action.icon] || Code;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 hover:scale-[1.02] transition-all duration-200 group"
            >
              <Icon className="w-6 h-6 text-zinc-400 group-hover:text-white transition-colors" />
              <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors text-center">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
