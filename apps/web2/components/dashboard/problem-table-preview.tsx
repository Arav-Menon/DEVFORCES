"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Check, Search } from "lucide-react";
import { mockProblems } from "@/components/dashboard/mock-data";
import type { Problem } from "@/components/dashboard/mock-data";

const difficultyColor = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

const difficulties = ["All", "Easy", "Medium", "Hard"] as const;

export function ProblemTablePreview() {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = mockProblems.filter((p) => {
    const matchesDifficulty = filter === "All" || p.difficulty === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Recommended Problems</h3>
          <Link href="/problems" className="text-xs text-blue-400 hover:text-blue-300 transition flex items-center gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600"
            />
          </div>
          <div className="flex gap-1.5">
            {difficulties.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  filter === d
                    ? "bg-zinc-700 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left text-xs font-medium text-zinc-500 px-6 py-3">#</th>
              <th className="text-left text-xs font-medium text-zinc-500 px-6 py-3">Problem</th>
              <th className="text-left text-xs font-medium text-zinc-500 px-6 py-3">Difficulty</th>
              <th className="text-left text-xs font-medium text-zinc-500 px-6 py-3">Acceptance</th>
              <th className="text-left text-xs font-medium text-zinc-500 px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {filtered.map((problem, idx) => (
              <tr key={problem.id} className="hover:bg-zinc-800/30 transition">
                <td className="px-6 py-3 text-sm text-zinc-500">{idx + 1}</td>
                <td className="px-6 py-3">
                  <Link href={`/problems/${problem.id}`} className="text-sm font-medium text-white hover:text-blue-400 transition">
                    {problem.title}
                  </Link>
                </td>
                <td className={`px-6 py-3 text-sm font-medium ${difficultyColor[problem.difficulty]}`}>
                  {problem.difficulty}
                </td>
                <td className="px-6 py-3 text-sm text-zinc-400">{problem.acceptance}%</td>
                <td className="px-6 py-3">
                  {problem.solved ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-zinc-600" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-6 py-8 text-center text-sm text-zinc-500">
            No problems match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
