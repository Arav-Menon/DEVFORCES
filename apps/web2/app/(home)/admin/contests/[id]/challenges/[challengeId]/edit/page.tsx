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
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchChallenge,
  updateChallenge,
  deleteChallenge,
  type Challenge,
} from "@/utils/admin_api/api";

export default function ChallengeEditPage() {
  const router = useRouter();
  const params = useParams();
  const contestId = params.id as string;
  const challengeId = params.challengeId as string;

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    requirements: "",
    constraints: "",
    difficulty: "MEDIUM" as "EASY" | "MEDIUM" | "HARD",
    maxPoints: 50,
    startAt: "",
    endAt: "",
    allowedLanguages: "python,javascript,java,cpp",
  });

  useEffect(() => {
    loadChallenge();
  }, [contestId, challengeId]);

  const loadChallenge = async () => {
    try {
      setLoading(true);
      const data = await fetchChallenge(contestId, challengeId);
      setChallenge(data);
      setFormData({
        title: data.title,
        slug: data.slug,
        description: data.description,
        requirements: data.requirements,
        constraints: data.constraints,
        difficulty: data.difficulty,
        maxPoints: data.maxPoints,
        startAt: data.startAt
          ? new Date(data.startAt).toISOString().slice(0, 16)
          : "",
        endAt: data.endAt
          ? new Date(data.endAt).toISOString().slice(0, 16)
          : "",
        allowedLanguages: data.allowedLanguages.join(","),
      });
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load challenge");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
        description: formData.description,
        requirements: formData.requirements,
        constraints: formData.constraints,
        difficulty: formData.difficulty,
        maxPoints: Number(formData.maxPoints),
        allowedLanguages: formData.allowedLanguages
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean),
      };

      if (formData.startAt) {
        payload.startAt = new Date(formData.startAt).toISOString();
      }

      if (formData.endAt) {
        payload.endAt = new Date(formData.endAt).toISOString();
      }

      await updateChallenge(contestId, challengeId, payload);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error?.title?.[0] ||
          "Failed to update challenge"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this challenge?")) {
      return;
    }

    try {
      await deleteChallenge(contestId, challengeId);
      router.push(`/admin/contests/${contestId}/edit`);
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete challenge");
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
            <h1 className="text-3xl font-bold tracking-tight">
              Edit Challenge
            </h1>
            <Button
              variant="ghost"
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Challenge
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
            <p className="text-sm font-medium">
              Challenge updated successfully!
            </p>
          </div>
        )}

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">
              Challenge Details
            </h2>
            <div className="space-y-6">
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

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Description
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white transition-all rounded-xl p-4 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  required
                  rows={3}
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white transition-all rounded-xl p-4 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Constraints
                </label>
                <textarea
                  name="constraints"
                  required
                  rows={3}
                  value={formData.constraints}
                  onChange={handleChange}
                  className="w-full bg-zinc-950/50 border border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white transition-all rounded-xl p-4 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">
              Challenge Settings
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-300">
                    Difficulty
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="h-12 w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl px-4 focus:ring-1 focus:ring-white transition-all"
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-300">
                    Max Points
                  </label>
                  <Input
                    type="number"
                    name="maxPoints"
                    required
                    min={10}
                    max={100}
                    value={formData.maxPoints}
                    onChange={handleChange}
                    className="h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white transition-all rounded-xl"
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
                    name="startAt"
                    value={formData.startAt}
                    onChange={handleChange}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      setFormData((prev) => ({ ...prev, startAt: target.value }));
                    }}
                    className="h-12 bg-zinc-950/50 border-zinc-800 text-white focus:ring-1 focus:ring-white transition-all rounded-xl [color-scheme:dark]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-300">
                    End Time
                  </label>
                  <Input
                    type="datetime-local"
                    name="endAt"
                    value={formData.endAt}
                    onChange={handleChange}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      setFormData((prev) => ({ ...prev, endAt: target.value }));
                    }}
                    className="h-12 bg-zinc-950/50 border-zinc-800 text-white focus:ring-1 focus:ring-white transition-all rounded-xl [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Allowed Languages (comma-separated)
                </label>
                <Input
                  type="text"
                  name="allowedLanguages"
                  value={formData.allowedLanguages}
                  onChange={handleChange}
                  placeholder="python,javascript,java,cpp"
                  className="h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white transition-all rounded-xl"
                />
              </div>
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
      </main>
    </div>
  );
}
