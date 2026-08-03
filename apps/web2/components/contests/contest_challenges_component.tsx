"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Award, ChevronRight, Code2, BookOpen, AlertCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchChallenges as fetchChallengesApi } from "@/utils/admin_api/api";

interface EvaluationConfig {
  scoring?: Record<string, number>;
  promptType?: string;
  strictRules?: string[];
  outputFormat?: string;
}

interface Challenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  requirements: string;
  constraints?: string;
  examples?: any;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  maxPoints: number;
  allowedLanguages: string[];
  evaluationConfig: EvaluationConfig;
  startAt: string;
  endAt: string;
  contestId: string;
}

function DifficultyBadge({ difficulty }: { difficulty: Challenge["difficulty"] }) {
  const map = {
    EASY: "text-green-400 bg-green-400/10 border-green-400/20",
    MEDIUM: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    HARD: "text-red-400 bg-red-400/10 border-red-400/20",
  };
  return (
    <span
      className={`inline-block px-2.5 py-0.5 rounded-full border text-xs font-semibold capitalize ${map[difficulty]}`}
    >
      {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
    </span>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function LanguagePill({ lang }: { lang: string }) {
  return (
    <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 font-mono">
      {lang}
    </span>
  );
}

export default function ContestDetailPage({ contestId }: { contestId: string }) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contestId) return;
    const load = async () => {
      try {
        const data = await fetchChallengesApi(contestId);
        setChallenges(data ?? []);
      } catch (err: any) {
        setError("Failed to load challenges.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [contestId]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <Link
            href="/contests"
            className="inline-flex items-center gap-1 text-zinc-400 hover:text-white text-sm transition mb-3"
          >
            ← Back to Contests
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Challenges</h1>
              <p className="text-zinc-500 text-sm mt-1">
                Complete all challenges to maximize your score
              </p>
            </div>
            {!loading && (
              <span className="text-zinc-400 text-sm">
                {challenges.length} challenge{challenges.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border border-zinc-800 rounded-lg p-6 animate-pulse space-y-3"
              >
                <div className="h-5 w-64 bg-zinc-800 rounded" />
                <div className="h-3 w-48 bg-zinc-800 rounded" />
                <div className="h-3 w-full bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex items-center gap-3 text-red-400 border border-red-500/20 bg-red-500/10 rounded-lg p-5">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        ) : challenges.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg mb-1">No challenges yet</p>
            <p className="text-zinc-600 text-sm">Check back once the contest starts</p>
          </div>
        ) : (
          <div className="space-y-5">
            {challenges.map((challenge, idx) => (
              <div
                key={challenge.id}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition group"
              >
                {/* Top row */}
                <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <span className="text-zinc-600 font-mono text-sm">#{idx + 1}</span>
                      <h2 className="text-lg font-bold text-white group-hover:text-white/80 transition">
                        {challenge.title}
                      </h2>
                      <DifficultyBadge difficulty={challenge.difficulty} />
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                      {challenge.description}
                    </p>
                  </div>

                  {/* Points */}
                  <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2 flex-shrink-0 self-start">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-300 font-bold text-sm">{challenge.maxPoints} pts</span>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-xs text-zinc-500 self-center mr-1 flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5" /> Allowed:
                  </span>
                  {challenge.allowedLanguages.map((lang) => (
                    <LanguagePill key={lang} lang={lang} />
                  ))}
                </div>

                {/* Time + strict rules preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>
                      Starts:{" "}
                      <span className="text-zinc-300">{formatDate(challenge.startAt)}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>
                      Ends:{" "}
                      <span className="text-zinc-300">{formatDate(challenge.endAt)}</span>
                    </span>
                  </div>
                </div>

                {/* Strict rules if any */}
                {challenge.evaluationConfig?.strictRules &&
                  challenge.evaluationConfig.strictRules.length > 0 && (
                    <div className="rounded-lg p-3 mb-5">
                      <p className="text-xs text-white font-semibold mb-2 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Strict Rules
                      </p>
                      <ul className="space-y-1">
                        {challenge.evaluationConfig.strictRules.map((rule, i) => (
                          <li key={i} className="text-xs text-zinc-400 flex gap-2">
                            <span className="text-red-500 mt-0.5">•</span>
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Footer CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                  <span className="text-xs text-zinc-600 font-mono">/{challenge.slug}</span>
                <Link href={`/challenges/${challenge.slug}?c=${challenge.contestId}`}>
                    <Button
                      size="sm"
                      className="bg-white/90 hover:bg-white/80 text-zinc-900 font-semibold"
                    >
                      Solve Challenge
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
