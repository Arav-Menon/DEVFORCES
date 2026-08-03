"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatsCardSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { fetchMyContests, type Contest } from "@/utils/admin_api/api";
import {
  Trophy,
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "Not scheduled";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: Contest["status"] }) {
  const configs = {
    ONGOING: {
      label: "Live",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      dot: "bg-emerald-400",
    },
    UPCOMING: {
      label: "Upcoming",
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      dot: "bg-amber-400",
    },
    ENDED: {
      label: "Ended",
      color: "text-zinc-400",
      bg: "bg-zinc-500/10 border-zinc-500/20",
      dot: "bg-zinc-400",
    },
  };
  const c = configs[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${c.bg} ${c.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

export default function AdminDashboardPage() {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadContests();
  }, []);

  const loadContests = async () => {
    try {
      setLoading(true);
      const data = await fetchMyContests({ sort: "newest" });
      setContests(data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load contests");
    } finally {
      setLoading(false);
    }
  };

  const totalChallenges = contests.reduce(
    (sum, c) => sum + (c._count?.challenges ?? 0),
    0
  );
  const activeCount = contests.filter((c) => c.status === "ONGOING").length;
  const upcomingCount = contests.filter((c) => c.status === "UPCOMING").length;
  const endedCount = contests.filter((c) => c.status === "ENDED").length;
  const recentContests = contests.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-zinc-500 mt-1">
            Overview of your contests and activity
          </p>
        </div>
        <Link href="/create-contests">
          <Button className="bg-white text-black hover:bg-zinc-200 font-semibold">
            <Plus className="w-4 h-4 mr-2" />
            New Contest
          </Button>
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="p-2 bg-blue-500/10 rounded-lg w-fit mb-3">
              <Trophy className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-zinc-400 text-sm">Total Contests</p>
            <p className="text-3xl font-bold text-white mt-1">
              {contests.length}
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="p-2 bg-emerald-500/10 rounded-lg w-fit mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-zinc-400 text-sm">Active Contests</p>
            <p className="text-3xl font-bold text-white mt-1">{activeCount}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="p-2 bg-amber-500/10 rounded-lg w-fit mb-3">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-zinc-400 text-sm">Upcoming</p>
            <p className="text-3xl font-bold text-white mt-1">
              {upcomingCount}
            </p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
            <div className="p-2 bg-zinc-500/10 rounded-lg w-fit mb-3">
              <Calendar className="w-5 h-5 text-zinc-400" />
            </div>
            <p className="text-zinc-400 text-sm">Total Challenges</p>
            <p className="text-3xl font-bold text-white mt-1">
              {totalChallenges}
            </p>
          </div>
        </div>
      )}

      {/* Recent Contests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Contests</h2>
          {contests.length > 0 && (
            <Link
              href="/admin/contests"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              View all
            </Link>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-5 w-48 bg-zinc-800 rounded" />
                    <div className="h-4 w-32 bg-zinc-800 rounded" />
                  </div>
                  <div className="h-6 w-16 bg-zinc-800 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : contests.length === 0 ? (
          <EmptyState
            icon={Trophy}
            title="No contests yet"
            description="Create your first contest to get started with the admin dashboard."
            action={{ label: "Create Contest", href: "/create-contests" }}
          />
        ) : (
          <div className="space-y-3">
            {recentContests.map((contest) => (
              <Link
                key={contest.id}
                href={`/admin/contests/${contest.id}`}
                className="block bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-white">
                        {contest.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-zinc-500">
                        <span className="font-mono text-xs">/{contest.slug}</span>
                        <span>{formatDate(contest.startTime)}</span>
                        <span>
                          {contest._count?.challenges ?? 0} challenges
                        </span>
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={contest.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
