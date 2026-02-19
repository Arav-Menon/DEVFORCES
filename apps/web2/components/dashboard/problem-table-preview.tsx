"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  acceptance: number;
  solved?: boolean;
}

interface ProblemTablePreviewProps {
  problems: Problem[];
  title?: string;
  viewAllLink?: string;
}

const difficultyColor = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

export function ProblemTablePreview({
  problems,
  title = "Recommended Problems",
  viewAllLink = "/problems",
}: ProblemTablePreviewProps) {
  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg overflow-hidden mt-6 ">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <Link
          href={viewAllLink}
          className="text-blue-400 hover:text-blue-300 transition text-sm flex items-center gap-1"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950">
              <th className="px-6 py-4 text-left text-zinc-400 font-semibold">
                #
              </th>
              <th className="px-6 py-4 text-left text-zinc-400 font-semibold">
                Problem
              </th>
              <th className="px-6 py-4 text-left text-zinc-400 font-semibold">
                Difficulty
              </th>
              <th className="px-6 py-4 text-left text-zinc-400 font-semibold">
                Acceptance
              </th>
              <th className="px-6 py-4 text-center text-zinc-400 font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr
                key={problem.id}
                className="border-b border-zinc-800 hover:bg-zinc-800/50 transition"
              >
                <td className="px-6 py-4 text-zinc-400">{index + 1}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/problems/${problem.id}`}
                    className="text-white hover:text-blue-400 transition"
                  >
                    {problem.title}
                  </Link>
                </td>
                <td
                  className={`px-6 py-4 font-semibold ${difficultyColor[problem.difficulty]}`}
                >
                  {problem.difficulty}
                </td>
                <td className="px-6 py-4 text-zinc-400">
                  {problem.acceptance}%
                </td>
                <td className="px-6 py-4 text-center">
                  <Link href={`/problems/${problem.id}`}>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded hover:bg-blue-500/20 transition">
                      {problem.solved ? (
                        <span className="text-green-400 text-lg">✓</span>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-blue-400" />
                      )}
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
