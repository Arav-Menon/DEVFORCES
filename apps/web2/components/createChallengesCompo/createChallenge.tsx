"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createChallenge,
  fetchContest,
  type Contest,
} from "@/utils/admin_api/api";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Plus,
  X,
} from "lucide-react";

const LANGUAGES = [
  "python",
  "javascript",
  "typescript",
  "java",
  "cpp",
  "c",
  "go",
  "rust",
  "ruby",
  "swift",
  "kotlin",
];

export default function CreateChallengePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const contestId = searchParams.get("contestId");

  const [contest, setContest] = useState<Contest | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingContest, setLoadingContest] = useState(true);
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
    allowedLanguages: ["python", "javascript"] as string[],
    examples: '[{"input": "example input", "output": "example output"}]',
    evaluationConfig: '{"type": "ai", "criteria": []}',
  });

  const [newLanguage, setNewLanguage] = useState("");

  useEffect(() => {
    if (!contestId) {
      setLoadingContest(false);
      return;
    }
    fetchContest(contestId)
      .then(setContest)
      .catch(() => {})
      .finally(() => setLoadingContest(false));
  }, [contestId]);

  if (!contestId) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-zinc-400 mb-2">
            No contest selected
          </h2>
          <p className="text-zinc-500 mb-6">
            Please select a contest to create a challenge.
          </p>
          <Link href="/admin/contests">
            <Button className="bg-white text-black hover:bg-zinc-200">
              Go to My Contests
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addLanguage = (lang: string) => {
    if (lang && !formData.allowedLanguages.includes(lang)) {
      setFormData((prev) => ({
        ...prev,
        allowedLanguages: [...prev.allowedLanguages, lang],
      }));
    }
    setNewLanguage("");
  };

  const removeLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      allowedLanguages: prev.allowedLanguages.filter((l) => l !== lang),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.title.trim() || !formData.slug.trim()) {
      setError("Title and slug are required");
      return;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!formData.requirements.trim()) {
      setError("Requirements are required");
      return;
    }
    if (!formData.startAt || !formData.endAt) {
      setError("Start time and end time are required");
      return;
    }
    if (formData.allowedLanguages.length === 0) {
      setError("At least one language is required");
      return;
    }

    try {
      JSON.parse(formData.examples);
      JSON.parse(formData.evaluationConfig);
    } catch {
      setError("Examples and Evaluation Config must be valid JSON");
      return;
    }

    setLoading(true);

    try {
      await createChallenge(contestId, {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        requirements: formData.requirements,
        constraints: formData.constraints || undefined as any,
        difficulty: formData.difficulty,
        maxPoint: formData.maxPoints,
        startAt: new Date(formData.startAt).toISOString(),
        endAt: new Date(formData.endAt).toISOString(),
        allowedLanguages: formData.allowedLanguages,
        example: JSON.parse(formData.examples),
        evaluationConfig: JSON.parse(formData.evaluationConfig),
      });
      setSuccess(true);
      setTimeout(() => {
        router.push(`/admin/contests/${contestId}`);
      }, 1500);
    } catch (err: any) {
      console.error(err);
      const data = err.response?.data;
      if (data?.error) {
        const messages = Object.entries(data.error)
          .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(", ")}`)
          .join("; ");
        setError(messages || "Validation failed");
      } else {
        setError(
          data?.message || "Failed to create challenge"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/admin/contests/${contestId}`}
          className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-4 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to {contest?.title || "Contest"}
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">
          Create Challenge
        </h1>
        <p className="text-zinc-500 mt-1">
          Add a new challenge to {contest?.title || "this contest"}
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl mb-6">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium">
            Challenge created successfully! Redirecting...
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Basic Information
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Title *
                </label>
                <Input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Two Sum"
                  className="h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Slug *
                </label>
                <Input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="e.g. two-sum"
                  className="h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white rounded-xl font-mono"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300">
                Description * (Markdown supported)
              </label>
              <textarea
                name="description"
                required
                rows={6}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the problem clearly..."
                className="w-full bg-zinc-950/50 border border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white rounded-xl p-4 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300">
                Requirements * (Markdown supported)
              </label>
              <textarea
                name="requirements"
                required
                rows={4}
                value={formData.requirements}
                onChange={handleChange}
                placeholder="What the solution should achieve..."
                className="w-full bg-zinc-950/50 border border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white rounded-xl p-4 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300">
                Constraints
              </label>
              <textarea
                name="constraints"
                rows={3}
                value={formData.constraints}
                onChange={handleChange}
                placeholder="e.g. 1 <= n <= 10^5, -10^9 <= nums[i] <= 10^9"
                className="w-full bg-zinc-950/50 border border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white rounded-xl p-4 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Settings</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Difficulty *
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="h-12 w-full bg-zinc-950/50 border border-zinc-800 text-white rounded-xl px-4 focus:ring-1 focus:ring-white"
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Max Points *
                </label>
                <Input
                  type="number"
                  name="maxPoints"
                  required
                  min={10}
                  max={100}
                  value={formData.maxPoints}
                  onChange={handleChange}
                  className="h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  Start Time *
                </label>
                <Input
                  type="datetime-local"
                  name="startAt"
                  required
                  value={formData.startAt}
                  onChange={handleChange}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    setFormData((prev) => ({ ...prev, startAt: target.value }));
                  }}
                  className="h-12 bg-zinc-950/50 border-zinc-800 text-white focus:ring-1 focus:ring-white rounded-xl [color-scheme:dark]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300">
                  End Time *
                </label>
                <Input
                  type="datetime-local"
                  name="endAt"
                  required
                  value={formData.endAt}
                  onChange={handleChange}
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    setFormData((prev) => ({ ...prev, endAt: target.value }));
                  }}
                  className="h-12 bg-zinc-950/50 border-zinc-800 text-white focus:ring-1 focus:ring-white rounded-xl [color-scheme:dark]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Allowed Languages *
          </h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {formData.allowedLanguages.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-white text-sm"
                >
                  {lang}
                  <button
                    type="button"
                    onClick={() => removeLanguage(lang)}
                    className="text-zinc-400 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <select
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                className="h-10 px-3 bg-zinc-950/50 border border-zinc-800 text-white rounded-lg text-sm"
              >
                <option value="">Select language...</option>
                {LANGUAGES.filter(
                  (l) => !formData.allowedLanguages.includes(l)
                ).map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => addLanguage(newLanguage)}
                disabled={!newLanguage}
                className="text-zinc-400 hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* JSON Configs */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">
            Configuration
          </h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300">
                Examples * (JSON)
              </label>
              <textarea
                name="examples"
                rows={4}
                value={formData.examples}
                onChange={handleChange}
                className="w-full bg-zinc-950/50 border border-zinc-800 text-white font-mono text-sm focus:ring-1 focus:ring-white rounded-xl p-4 resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300">
                Evaluation Config * (JSON)
              </label>
              <textarea
                name="evaluationConfig"
                rows={3}
                value={formData.evaluationConfig}
                onChange={handleChange}
                className="w-full bg-zinc-950/50 border border-zinc-800 text-white font-mono text-sm focus:ring-1 focus:ring-white rounded-xl p-4 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading || success}
          className="h-12 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 font-semibold rounded-xl transition-all"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Challenge"
          )}
        </Button>
      </form>
    </div>
  );
}
