"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Save,
  Trash2,
  Plus,
  Pencil,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchContest,
  updateContest,
  deleteContest,
  deleteChallenge,
  type Contest,
  type Challenge,
} from "@/utils/admin_api/api";

export default function ContestEditPage() {
  const router = useRouter();
  const params = useParams();
  const contestId = params.id as string;

  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    startTime: "",
    status: "UPCOMING",
  });

  useEffect(() => {
    loadContest();
  }, [contestId]);

  const loadContest = async () => {
    try {
      setLoading(true);
      const data = await fetchContest(contestId);
      setContest(data);
      setFormData({
        title: data.title,
        slug: data.slug,
        startTime: data.startTime
          ? new Date(data.startTime).toISOString().slice(0, 16)
          : "",
        status: data.status,
      });
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load contest");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const payload: any = {
        title: formData.title,
        slug: formData.slug,
        status: formData.status,
      };

      if (formData.startTime) {
        payload.startTime = new Date(formData.startTime).toISOString();
      }

      await updateContest(contestId, payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error?.title?.[0] ||
          err.response?.data?.error?.slug?.[0] ||
          "Failed to update contest"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteContest = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this contest? All challenges will also be deleted. This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      await deleteContest(contestId);
      router.push("/admin");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete contest");
    }
  };

  const handleDeleteChallenge = async (challengeId: string) => {
    if (
      !confirm("Are you sure you want to delete this challenge?")
    ) {
      return;
    }

    try {
      await deleteChallenge(contestId, challengeId);
      setContest((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          challenges: prev.challenges?.filter((c) => c.id !== challengeId),
        };
      });
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete challenge");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONGOING":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "UPCOMING":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "ENDED":
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "MEDIUM":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "HARD":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <header className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-black sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="h-8 w-48 bg-zinc-800 rounded animate-pulse"></div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-6 py-8">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 animate-pulse">
            <div className="h-6 w-64 bg-zinc-800 rounded mb-4"></div>
            <div className="h-4 w-48 bg-zinc-800 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 w-full bg-zinc-800 rounded"></div>
              <div className="h-12 w-full bg-zinc-800 rounded"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-black sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            href={`/admin/contests/${contestId}`}
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Contest
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Edit Contest</h1>
            <Button
              variant="ghost"
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={handleDeleteContest}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Contest
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Error State */}
        {error && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-6">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Success State */}
        {success && (
          <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl mb-6">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">Contest updated successfully!</p>
          </div>
        )}

        {/* Edit Form */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Contest Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Title
                </label>
                <Input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white transition-all rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Slug
                </label>
                <Input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white transition-all rounded-xl font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Start Time
                </label>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    setFormData((prev) => ({ ...prev, startTime: target.value }));
                  }}
                  className="h-12 bg-zinc-950/50 border-zinc-800 text-white focus:ring-1 focus:ring-white transition-all rounded-xl [color-scheme:dark]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="h-12 w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl px-4 focus:ring-1 focus:ring-white transition-all"
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="ENDED">Ended</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={saving}
              className="h-12 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 font-semibold rounded-xl transition-all"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Challenges Section */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              Challenges ({contest?.challenges?.length || 0})
            </h2>
            <Link href={`/create-challenges?contestId=${contestId}`}>
              <Button className="bg-white text-black hover:bg-zinc-200 font-semibold">
                <Plus className="w-4 h-4 mr-2" />
                Add Challenge
              </Button>
            </Link>
          </div>

          {!contest?.challenges || contest.challenges.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">
              No challenges yet. Add your first challenge to this contest.
            </div>
          ) : (
            <div className="space-y-3">
              {contest.challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="flex items-center justify-between p-4 bg-zinc-950/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-white">
                        {challenge.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-zinc-500">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getDifficultyColor(
                            challenge.difficulty
                          )}`}
                        >
                          {challenge.difficulty}
                        </span>
                        <span>{challenge.maxPoints} points</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
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
                      onClick={() => handleDeleteChallenge(challenge.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
