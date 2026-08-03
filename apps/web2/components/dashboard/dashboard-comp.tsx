"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PersonalStats } from "@/components/dashboard/personal-stats";
import { ContestWidget } from "@/components/dashboard/contest-widget";
import { PerformanceAnalytics } from "@/components/dashboard/performance-analytics";
import { ProblemTablePreview } from "@/components/dashboard/problem-table-preview";
import { SkillAnalytics } from "@/components/dashboard/skill-analytics";
import { LeaderboardPreview } from "@/components/dashboard/leaderboard-preview";
import { SubmissionList } from "@/components/dashboard/submission-list";
import { UpcomingContests } from "@/components/dashboard/upcoming-contests";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { Achievements } from "@/components/dashboard/achievements";
import { SystemStatus } from "@/components/dashboard/system-status";
import { Button } from "@/components/ui/button";
import { Trophy, User, LogOut, Loader2 } from "lucide-react";
import {
  fetchContests as fetchAllContests,
  fetchUserStats,
  fetchUserSubmissions,
  fetchUserRatingHistory,
  fetchLeaderboard,
  fetchUpcomingContests,
  type UserStats,
  type UserSubmission,
  type RatingHistory,
  type LeaderboardEntry,
  type UpcomingContest,
  type Contest,
} from "@/utils/admin_api/api";

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Data states
  const [contests, setContests] = useState<Contest[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [ratingHistory, setRatingHistory] = useState<RatingHistory[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [upcomingContests, setUpcomingContests] = useState<UpcomingContest[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
      setUserRole(payload.role);
    } catch {
      router.push("/");
      return;
    }
  }, [router]);

  useEffect(() => {
    if (!userId) return;

    const fetchAllData = async () => {
      try {
        const [contestsData, statsData, submissionsData, ratingData, leaderboardData, upcomingData] =
          await Promise.allSettled([
            fetchAllContests(),
            fetchUserStats(userId),
            fetchUserSubmissions(userId, 10),
            fetchUserRatingHistory(userId),
            fetchLeaderboard(5),
            fetchUpcomingContests(3),
          ]);

        if (contestsData.status === "fulfilled") setContests(contestsData.value);
        if (statsData.status === "fulfilled") setUserStats(statsData.value);
        if (submissionsData.status === "fulfilled") setSubmissions(submissionsData.value);
        if (ratingData.status === "fulfilled") setRatingHistory(ratingData.value);
        if (leaderboardData.status === "fulfilled") setLeaderboard(leaderboardData.value);
        if (upcomingData.status === "fulfilled") setUpcomingContests(upcomingData.value);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const latestContest = contests.length > 0 ? contests[0] : null;

  if (loading) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-zinc-400">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Sticky Header */}
      <div className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-black sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <img src="logo.png" className="h-12" alt="DevForce" />
            </div>
            <div className="flex gap-3">
              <Link href="/profile/sd">
                <Button className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              {(userRole === "ADMIN" || userRole === "CREATOR") && (
                <Link href="/admin">
                  <Button className="bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
                    <Trophy className="w-4 h-4 mr-2" />
                    Manage Contests
                  </Button>
                </Link>
              )}
              <Link href="/contests">
                <Button className="bg-white/90 hover:bg-white/80 text-black">
                  <Trophy className="w-4 h-4 mr-2" />
                  Join Contest
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-zinc-800 hover:bg-red-900/50 text-zinc-400 hover:text-red-400 border border-zinc-700 hover:border-red-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Personal Stats */}
        <PersonalStats userStats={userStats} />

        {/* Main Grid: 2-col main + 1-col sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column — 2/3 width */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Contest */}
            {latestContest ? (
              <ContestWidget
                title={latestContest.title}
                slug={latestContest.slug}
                startTime={latestContest.startTime || new Date().toISOString()}
                status={latestContest.status}
                participants={latestContest._count?.challenges || 0}
                challenges={latestContest._count?.challenges || 0}
              />
            ) : (
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 text-center text-zinc-500">
                No contests available right now.
              </div>
            )}

            {/* Performance Analytics */}
            <PerformanceAnalytics ratingHistory={ratingHistory} />

            {/* Recommended Problems */}
            <ProblemTablePreview />

            {/* Recent Activity */}
            <SubmissionList submissions={submissions} />

            {/* Quick Actions */}
            <QuickActions />
          </div>

          {/* Right Column — 1/3 width */}
          <div className="space-y-8">
            {/* Skill Analytics */}
            <SkillAnalytics />

            {/* Leaderboard */}
            <LeaderboardPreview
              users={leaderboard.map((entry) => ({
                ...entry,
                isCurrentUser: entry.username === userStats?.username,
              }))}
              currentUserRank={userStats?.rank}
            />

            {/* Upcoming Contests */}
            <UpcomingContests contests={upcomingContests} />

            {/* Achievements */}
            <Achievements userStats={userStats} />

            {/* System Status */}
            <SystemStatus />
          </div>
        </div>
      </div>
    </main>
  );
}
