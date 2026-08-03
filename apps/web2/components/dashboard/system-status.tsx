"use client";

import { Activity, Database, Users, Clock } from "lucide-react";

export function SystemStatus() {
  const stats = [
    { label: "API Response", value: "42ms", icon: Activity, color: "text-green-400" },
    { label: "Database", value: "Connected", icon: Database, color: "text-green-400" },
    { label: "Online Users", value: "1,247", icon: Users, color: "text-blue-400" },
    { label: "Last Sync", value: "2m ago", icon: Clock, color: "text-zinc-400" },
  ];

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <h3 className="text-sm font-medium text-zinc-400">System Status</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800/50">
              <s.icon className={`w-4 h-4 ${s.color}`} />
              <div>
                <p className="text-xs text-zinc-500">{s.label}</p>
                <p className="text-sm font-medium text-white">{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
