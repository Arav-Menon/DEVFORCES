"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, Users, TrendingUp, Zap } from "lucide-react";

interface Contest {
  id: number;
  name: string;
  startTime: string;
  duration: string;
  difficulty: string;
  participants: number;
  status: "LIVE" | "UPCOMING" | "FINISHED";
  endTime?: string;
  registered?: number;
  placement?: string;
}

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // Mock data
  const contests: { ongoing: Contest[]; upcoming: Contest[]; past: Contest[] } =
    {
      ongoing: [
        {
          id: 1,
          name: "DevForce Weekly #100",
          startTime: "2 hours ago",
          duration: "2 hours",
          difficulty: "Medium",
          participants: 3241,
          status: "LIVE",
          endTime: "1h 58m left",
        },
        {
          id: 2,
          name: "Spring Challenge 2026",
          startTime: "5 hours ago",
          duration: "3 hours",
          difficulty: "Hard",
          participants: 5891,
          status: "LIVE",
          endTime: "55m left",
        },
      ],
      upcoming: [
        {
          id: 3,
          name: "DevForce Weekly #101",
          startTime: "Starts in 2 days",
          duration: "2 hours",
          difficulty: "Medium",
          participants: 0,
          status: "UPCOMING",
          registered: 1243,
        },
        {
          id: 4,
          name: "Algorithm Mastery Contest",
          startTime: "Starts in 5 days",
          duration: "4 hours",
          difficulty: "Hard",
          participants: 0,
          status: "UPCOMING",
          registered: 2891,
        },
        {
          id: 5,
          name: "Beginner Friendly Battle",
          startTime: "Starts in 1 week",
          duration: "1.5 hours",
          difficulty: "Easy",
          participants: 0,
          status: "UPCOMING",
          registered: 892,
        },
      ],
      past: [
        {
          id: 6,
          name: "DevForce Weekly #99",
          startTime: "1 week ago",
          duration: "2 hours",
          difficulty: "Medium",
          participants: 4123,
          status: "FINISHED",
          placement: "Rank #234",
        },
        {
          id: 7,
          name: "Spring Challenge 2025",
          startTime: "2 weeks ago",
          duration: "3 hours",
          difficulty: "Hard",
          participants: 6234,
          status: "FINISHED",
          placement: "Did not participate",
        },
      ],
    };

  const filteredContests = contests[activeTab as keyof typeof contests].filter(
    (contest) => contest.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedContests = [...filteredContests].sort((a, b) => {
    if (sortBy === "date") {
      return 0; // Keep original order
    } else if (sortBy === "difficulty") {
      const diffOrder = { Easy: 0, Medium: 1, Hard: 2 };
      return (
        diffOrder[a.difficulty as keyof typeof diffOrder] -
        diffOrder[b.difficulty as keyof typeof diffOrder]
      );
    } else if (sortBy === "popularity") {
      return b.participants - a.participants;
    }
    return 0;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-400/10";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/10";
      case "Hard":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-zinc-400 bg-zinc-400/10";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "LIVE":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "UPCOMING":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "FINISHED":
        return "bg-zinc-500/20 text-zinc-400 border border-zinc-500/30";
      default:
        return "bg-zinc-500/20 text-zinc-400";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 sticky top-0 z-40 bg-black/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">Contests</h1>
              <p className="text-zinc-400">Compete with developers worldwide</p>
            </div>
            <Button className="bg-white/90 text-zinc-950 hover:bg-white/80">
              Create Contest
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search contests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white hover:border-zinc-600 focus:border-blue-500 focus:outline-none transition"
            >
              <option value="date">Sort by Date</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="popularity">Sort by Popularity</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 flex gap-8">
            {["ongoing", "upcoming", "past"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-semibold transition capitalize ${
                  activeTab === tab
                    ? "border-white text-white/90"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {sortedContests.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-lg mb-4">No contests found</p>
            <Button
              variant="outline"
              className="border-zinc-600 text-white hover:bg-zinc-900"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedContests.map((contest) => (
              <div
                key={contest.id}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-6 hover:border-zinc-800 hover:bg-zinc-900/30 transition group"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Contest Info */}
                  <div className="md:col-span-5">
                    <Link href={`/contests/${contest.id}`}>
                      <h3 className="text-lg font-semibold group-hover:text-white/80 transition mb-2 cursor-pointer">
                        {contest.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {activeTab === "past"
                          ? contest.startTime
                          : `Starts ${contest.startTime}`}
                      </div>
                      <div>• {contest.duration}</div>
                    </div>
                  </div>

                  {/* Difficulty */}
                  <div className="md:col-span-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(contest.difficulty)}`}
                    >
                      {contest.difficulty}
                    </span>
                  </div>

                  {/* Participants */}
                  <div className="md:col-span-2 text-center">
                    <div className="flex items-center justify-center gap-2 text-zinc-400">
                      <Users className="w-4 h-4" />
                      <span>
                        {activeTab === "upcoming"
                          ? `${contest.registered} registered`
                          : `${contest.participants} participants`}
                      </span>
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div className="md:col-span-3 flex items-center justify-between gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(contest.status)}`}
                    >
                      {activeTab === "ongoing" && contest.endTime}
                      {activeTab === "upcoming" && contest.status}
                      {activeTab === "past" && contest.placement}
                    </span>
                    <Link href={`/contests/${contest.id}`}>
                      <Button
                        size="sm"
                        className={`${
                          activeTab === "ongoing"
                            ? "bg-zinc-800 hover:bg-white/80 text-zinc-950 hover:text-zinc-950 "
                            : "bg-zinc-800 hover:bg-zinc-700"
                        } text-white`}
                      >
                        {activeTab === "ongoing"
                          ? "Enter"
                          : activeTab === "upcoming"
                            ? "Register"
                            : "View"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
