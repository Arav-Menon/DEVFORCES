"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import {
  ContestCardSkeleton,
} from "@/components/ui/skeleton";
import {
  fetchMyContests,
  deleteContest,
  type Contest,
} from "@/utils/admin_api/api";
import {
  Plus,
  Search,
  Trophy,
  Pencil,
  Trash2,
  Eye,
  Calendar,
  ChevronDown,
} from "lucide-react";

function formatDate(dateStr: string | null) {
  if (!dateStr) return "Not scheduled";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
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
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${c.bg} ${c.color}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

type TabFilter = "ALL" | "ONGOING" | "UPCOMING" | "ENDED";

export default function MyContestsPage() {
  const router = useRouter();
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabFilter>("ALL");
  const [sort, setSort] = useState<"newest" | "oldest">("newest");

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<Contest | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadContests = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params: any = { sort };
      if (activeTab !== "ALL") params.status = activeTab;
      if (search.trim()) params.search = search.trim();
      const data = await fetchMyContests(params);
      setContests(data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load contests");
    } finally {
      setLoading(false);
    }
  }, [sort, activeTab, search]);

  useEffect(() => {
    loadContests();
  }, [loadContests]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await deleteContest(deleteTarget.id);
      setContests((prev) => prev.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete contest");
    } finally {
      setDeleting(false);
    }
  };

  const tabs: { label: string; value: TabFilter }[] = [
    { label: "All", value: "ALL" },
    { label: "Ongoing", value: "ONGOING" },
    { label: "Upcoming", value: "UPCOMING" },
    { label: "Ended", value: "ENDED" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Contests</h1>
          <p className="text-zinc-500 mt-1">
            Manage your contests and challenges
          </p>
        </div>
        <Link href="/create-contests">
          <Button className="bg-white text-black hover:bg-zinc-200 font-semibold">
            <Plus className="w-4 h-4 mr-2" />
            Create Contest
          </Button>
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Tabs */}
        <div className="flex gap-1 bg-zinc-900/50 border border-zinc-800 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? "bg-white text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search contests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "newest" | "oldest")}
              className="h-9 pl-3 pr-8 rounded-lg bg-zinc-900/50 border border-zinc-800 text-white text-sm appearance-none cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Contest List */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ContestCardSkeleton key={i} />
          ))}
        </div>
      ) : contests.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title={
            search || activeTab !== "ALL"
              ? "No contests match your filters"
              : "No contests yet"
          }
          description={
            search || activeTab !== "ALL"
              ? "Try adjusting your search or filter criteria."
              : "Create your first contest to get started."
          }
          action={
            !search && activeTab === "ALL"
              ? { label: "Create Contest", href: "/create-contests" }
              : undefined
          }
        />
      ) : (
        <div className="space-y-4">
          {contests.map((contest) => (
            <div
              key={contest.id}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white truncate">
                      {contest.title}
                    </h3>
                    <StatusBadge status={contest.status} />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-500">
                    <span className="font-mono text-xs">/{contest.slug}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(contest.startTime)}
                    </span>
                    <span>
                      {contest._count?.challenges ?? 0} challenges
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Link href={`/admin/contests/${contest.id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/contests/${contest.id}/edit`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-white"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-red-400"
                    onClick={() => setDeleteTarget(contest)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Contest"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This will also delete all challenges in this contest. This action cannot be undone.`}
        confirmLabel="Delete Contest"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
