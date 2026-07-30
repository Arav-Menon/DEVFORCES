"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { createContest } from "@/utils/challenge_api/weekly-devforce-contests/api";

export default function CreateContestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    startTime: "",
    status: "UPCOMING",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Ensure startTime is in ISO format
      const isoStartTime = new Date(formData.startTime).toISOString();
      const payload = {
        ...formData,
        startTime: isoStartTime,
      };

      await createContest(payload);
      setSuccess(true);
      setTimeout(() => {
        router.push("/contests");
      }, 2000);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error?.title?.[0] ||
          err.response?.data?.error?.slug?.[0] ||
          err.response?.data?.error?.startTime?.[0] ||
          "Failed to create contest. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Link
            href="/contests"
            className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Contests
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">Create Contest</h1>
          <p className="text-zinc-500 mt-2">
            Initialize a new competition for the community
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-8 relative">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300 ml-1">
                Title
              </label>
              <Input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Weekly Algorithm Sprint #42"
                className="h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white transition-all rounded-xl"
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-300 ml-1">
                Slug (URL friendly)
              </label>
              <Input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. weekly-sprint-42"
                className="h-12 bg-zinc-950/50 border-zinc-800 text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-white transition-all rounded-xl font-mono"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Time */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300 ml-1">
                  Start Time
                </label>
                <Input
                  type="datetime-local"
                  name="startTime"
                  required
                  value={formData.startTime}
                  onChange={handleChange}
                  className="h-12 bg-zinc-950/50 border-zinc-800 text-white focus:ring-1 focus:ring-white transition-all rounded-xl [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">
                  Contest created successfully! Redirecting...
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || success}
              className="w-full h-14 bg-white text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-500 font-bold text-lg rounded-xl transition-all active:scale-[0.98] shadow-xl shadow-white/5"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Contest"
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
