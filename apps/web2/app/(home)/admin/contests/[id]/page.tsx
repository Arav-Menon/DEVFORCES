"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import {
  fetchContest,
  fetchContestStats,
  fetchChallenges,
  deleteContest,
  deleteChallenge,
  type Contest,
  type Challenge,
  type ContestStats,
} from "@/utils/admin_api/api";
import {
  Pencil,
  Trash2,
  Plus,
  Trophy,
  Users,
  FileCode,
  Calendar,
  Clock,
  AlertCircle,
  Star,
  ChevronRight,
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

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const configs: Record<string, { color: string; bg: string }> = {
    EASY: { color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    MEDIUM: { color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    HARD: { color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  };
  const c = configs[difficulty] || configs.MEDIUM;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${c.bg} ${c.color}`}
    >
      {difficulty}
    </span>
  );
}

export default function ContestDetailPage() {
  const router = useRouter();
  const params = useParams();
  const contestId = params.id as string;

  const [contest, setContest] = useState<Contest | null>(null);
  const [stats, setStats] = useState<ContestStats | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [deleteContestTarget, setDeleteContestTarget] = useState(false);
  const [deleteChallengeTarget, setDeleteChallengeTarget] =
    useState<Challenge | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadData();
  }, [contestId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [contestData, statsData, challengesData] = await Promise.all([
        fetchContest(contestId),
        fetchContestStats(contestId).catch(() => null),
        fetchChallenges(contestId).catch(() => []),
      ]);
      setContest(contestData);
      setStats(statsData);
      setChallenges(challengesData);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load contest");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContest = async () => {
    try {
      setDeleting(true);
      await deleteContest(contestId);
      router.push("/admin/contests");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete contest");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteChallenge = async () => {
    if (!deleteChallengeTarget) return;
    try {
      setDeleting(true);
      await deleteChallenge(contestId, deleteChallengeTarget.id);
      setChallenges((prev) =>
        prev.filter((c) => c.id !== deleteChallengeTarget.id)
      );
      setDeleteChallengeTarget(null);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete challenge");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-24 bg-zinc-900/50 border border-zinc-800 rounded-xl animate-pulse"
            />
          ))}
        </div>
        <div className="h-64 bg-zinc-900/50 border border-zinc-800 rounded-xl animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!contest) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {contest.title}
            </h1>
            <StatusBadge status={contest.status} />
          </div>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span className="font-mono text-xs">/{contest.slug}</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(contest.startTime)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/admin/contests/${contestId}/edit`}>
            <Button className="bg-white text-black hover:bg-zinc-200 font-semibold">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            onClick={() => setDeleteContestTarget(true)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <FileCode className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Challenges</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalChallenges}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Participants</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalParticipants}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-400">Submissions</p>
                <p className="text-2xl font-bold text-white">
                  {stats.totalSubmissions}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Challenges */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Challenges</h2>
          <Link
            href={`/create-challenges?contestId=${contestId}`}
          >
            <Button className="bg-white text-black hover:bg-zinc-200 font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Add Challenge
            </Button>
          </Link>
        </div>

        {challenges.length === 0 ? (
          <EmptyState
            icon={FileCode}
            title="No challenges yet"
            description="Add your first challenge to this contest."
            action={{
              label: "Create Challenge",
              href: `/create-challenges?contestId=${contestId}`,
            }}
          />
        ) : (
          <div className="space-y-3">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-white truncate">
                        {challenge.title}
                      </h3>
                      <DifficultyBadge difficulty={challenge.difficulty} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5" />
                        {challenge.maxPoints} pts
                      </span>
                      <span>{challenge.allowedLanguages.length} languages</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {formatDate(challenge.startAt)} -{" "}
                        {formatDate(challenge.endAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Link
                      href={`/admin/contests/${contestId}/challenges/${challenge.id}/edit`}
                    >
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
                      onClick={() => setDeleteChallengeTarget(challenge)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Contest Confirmation */}
      <ConfirmDialog
        open={deleteContestTarget}
        title="Delete Contest"
        description={`Are you sure you want to delete "${contest.title}"? This will also delete all ${challenges.length} challenges. This action cannot be undone.`}
        confirmLabel="Delete Contest"
        loading={deleting}
        onConfirm={handleDeleteContest}
        onCancel={() => setDeleteContestTarget(false)}
      />

      {/* Delete Challenge Confirmation */}
      <ConfirmDialog
        open={!!deleteChallengeTarget}
        title="Delete Challenge"
        description={`Are you sure you want to delete "${deleteChallengeTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete Challenge"
        loading={deleting}
        onConfirm={handleDeleteChallenge}
        onCancel={() => setDeleteChallengeTarget(null)}
      />
    </div>
  );
}
