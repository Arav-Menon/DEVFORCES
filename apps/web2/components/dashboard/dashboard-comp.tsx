"use client";

import Link from "next/link";
import { ContestWidget } from "@/components/dashboard/contest-widget";
import { ProblemTablePreview } from "@/components/dashboard/problem-table-preview";
import { SubmissionList } from "@/components/dashboard/submission-list";
import { RatingChart } from "@/components/dashboard/rating-chart";
import { LeaderboardPreview } from "@/components/dashboard/leaderboard-preview";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Zap, Flame, Code, BookOpen, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchContest } from "@/utils/challenge_api/weekly-devforce-contests/api";




// Mock data
const mockStats = {
  rating: 1850,
  rank: 1234,
  problemsSolved: 342,
  streak: 15,
  contestRating: "Top 10%",
};


const mockProblems = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy" as const,
    acceptance: 47.3,
    solved: true,
  },
  {
    id: "2",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard" as const,
    acceptance: 31.2,
    solved: false,
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium" as const,
    acceptance: 34.8,
    solved: true,
  },
  {
    id: "4",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium" as const,
    acceptance: 52.1,
    solved: false,
  },
  {
    id: "5",
    title: "Regular Expression Matching",
    difficulty: "Hard" as const,
    acceptance: 27.6,
    solved: false,
  },
  {
    id: "6",
    title: "Container With Most Water",
    difficulty: "Medium" as const,
    acceptance: 51.3,
    solved: true,
  },
];

const mockSubmissions = [
  {
    id: "1",
    problemTitle: "Two Sum",
    status: "Accepted" as const,
    language: "Python",
    time: "5 minutes ago",
  },
  {
    id: "2",
    problemTitle: "Container With Most Water",
    status: "Accepted" as const,
    language: "JavaScript",
    time: "1 hour ago",
  },
  {
    id: "3",
    problemTitle: "Longest Substring Without Repeating Characters",
    status: "Wrong Answer" as const,
    language: "Python",
    time: "2 hours ago",
  },
  {
    id: "4",
    problemTitle: "LRU Cache",
    status: "Accepted" as const,
    language: "C++",
    time: "3 hours ago",
  },
  {
    id: "5",
    problemTitle: "Binary Tree Level Order Traversal",
    status: "Time Limit Exceeded" as const,
    language: "Python",
    time: "5 hours ago",
  },
  {
    id: "6",
    problemTitle: "Word Ladder",
    status: "Runtime Error" as const,
    language: "JavaScript",
    time: "1 day ago",
  },
  {
    id: "7",
    problemTitle: "Reverse Nodes in k-Group",
    status: "Accepted" as const,
    language: "Python",
    time: "2 days ago",
  },
  {
    id: "8",
    problemTitle: "Median of Two Sorted Arrays",
    status: "Wrong Answer" as const,
    language: "Java",
    time: "3 days ago",
  },
];

const mockRatingData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  rating: 1700 + Math.sin(i / 5) * 150 + Math.cos(i / 3) * 50,
}));


const mockLeaderboardUsers = [
  { rank: 1, username: "codemaster", rating: 2847, isCurrentUser: false },
  { rank: 2, username: "algorithm_pro", rating: 2756, isCurrentUser: false },
  { rank: 3, username: "competitive_dev", rating: 2734, isCurrentUser: false },
  { rank: 4, username: "you", rating: 1850, isCurrentUser: true },
  { rank: 5, username: "data_structures", rating: 2412, isCurrentUser: false },
];

export default function DashboardPage() {
  const [contests, setContests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyContests = async () => {
      try {
        const response = await fetchContest();
        setContests(response);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWeeklyContests();
  }, []);

  const latestContest = contests && contests.length > 0 ? contests[0] : null;

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-black sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <img src="logo.png" className="h-16" alt="" />
              <p className="text-zinc-400 ml-">
                Welcome back! Here's your coding journey at a glance.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/profile/sd">
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
                  <Code className="w-4 h-4 mr-2" />
                  Solve Problems
                </Button>
              </Link>
              <Link href="/contests">
                <Button className="bg-white/90 hover:bg-white/80 text-black">
                  <Trophy className="w-4 h-4 mr-2" />
                  Join Contest
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-8">
            {loading ? (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 animate-pulse">
                <div className="h-8 w-48 bg-zinc-800 rounded mb-4"></div>
                <div className="h-4 w-64 bg-zinc-800 rounded mb-6"></div>
                <div className="h-10 w-full bg-zinc-800 rounded"></div>
              </div>
            ) : latestContest ? (
              <ContestWidget
                title={latestContest.title}
                slug={latestContest.slug}
                startTime={latestContest.startTime}
                status={latestContest.status}
              />
            ) : (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 text-center text-zinc-500">
                No contests available right now.
              </div>
            )}

            <ProblemTablePreview
              problems={mockProblems}
              title="Recommended Problems"
            />

            <SubmissionList submissions={mockSubmissions} />
          </div>

          <div className="space-y-8">
            <RatingChart
              username="you"
              currentRating={mockStats.rating}
              data={mockRatingData}
            />

            <LeaderboardPreview
              users={mockLeaderboardUsers}
              currentUserRank={mockStats.rank}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
