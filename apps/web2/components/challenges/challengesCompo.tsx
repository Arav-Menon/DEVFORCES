"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Copy,
  RotateCcw,
  Send,
  X,
  Clock,
  Star,
  AlertCircle,
  Code2,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { fetchChallenge } from "@/utils/challenge_api/challenges_api/api";
import { codeSubmission } from "@/utils/submit_api/api";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Challenge {
  id: string;
  slug: string;
  title: string;
  description: string;
  requirements: string;
  constraints?: string;
  examples?: {
    input: Record<string, any>;
    expected: string;
  };
  difficulty: "EASY" | "MEDIUM" | "HARD";
  maxPoints: number;
  allowedLanguages: string[];
  evaluationConfig: {
    scoring?: Record<string, number>;
    promptType?: string;
    strictRules?: string[];
    outputFormat?: string;
  };
  startAt: string;
  endAt: string;
  contestId: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const difficultyConfig = {
  EASY: {
    label: "Easy",
    classes: "bg-green-400/10 text-green-400 border-green-400/20",
  },
  MEDIUM: {
    label: "Medium",
    classes: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  },
  HARD: {
    label: "Hard",
    classes: "bg-red-400/10 text-red-400 border-red-400/20",
  },
};

function formatDate(d: string) {
  return new Date(d).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function getDefaultCode(lang: string) {
  const templates: Record<string, string> = {
    javascript:
      "// Your solution here\n\nfunction solution() {\n  // implement me\n}\n",
    typescript:
      "// Your solution here\n\nfunction solution(): void {\n  // implement me\n}\n",
    python: "# Your solution here\n\ndef solution():\n    pass\n",
    java: "// Your solution here\n\npublic class Solution {\n    public void solve() {\n        // implement me\n    }\n}\n",
    cpp: "// Your solution here\n\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // implement me\n    return 0;\n}\n",
    go: "// Your solution here\n\npackage main\n\nfunc main() {\n    // implement me\n}\n",
  };
  return templates[lang] ?? "// Your solution here\n";
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function ChallengesPage({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const contestId = searchParams.get("c") ?? "";

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "description" | "requirements" | "examples"
  >("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(() => getDefaultCode("javascript"));
  const [testResults, setTestResults] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<{
    score: number;
    reason: string;
  } | null>(null);

  // WebSocket for real-time AI feedback
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    let userId: string | null = null;
    try {
      const payload = token.split(".")[1];
      userId = JSON.parse(atob(payload)).id;
    } catch (e) {
      console.error("Failed to parse token", e);
    }

    if (!userId) return;

    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => console.log("Connected to evaluation service");
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // data looks like { result: string (JSON), userId: string, challengeId: string }
        if (challenge && data.userId === userId && data.challengeId === challenge.id) {
          const cleaned = data.result
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
          const parsedResult = JSON.parse(cleaned);
          setAiFeedback({
            score: Number(parsedResult.score),
            reason: parsedResult.reason,
          });
        }
      } catch (e) {
        console.error("Error processing message", e);
      }
    };

    return () => ws.close();
  }, [challenge?.id]);


  // Fetch challenge data
  useEffect(() => {
    if (!contestId || !slug) return;
    const load = async () => {
      try {
        const data = await fetchChallenge(contestId, slug);
        if (!data) throw new Error("Challenge not found");
        setChallenge(data);
        // Set first allowed language as default
        if (data.allowedLanguages?.[0]) {
          setSelectedLanguage(data.allowedLanguages[0]);
          setCode(getDefaultCode(data.allowedLanguages[0]));
        }
      } catch (err: any) {
        setError("Failed to load challenge.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [contestId, slug]);

  // ── Loading / error states ──
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin mx-auto" />
          <p className="text-zinc-400 text-sm">Loading challenge…</p>
        </div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
          <p className="text-red-400">{error ?? "Challenge not found"}</p>
          <Link href="/contests">
            <Button
              variant="outline"
              className="border-zinc-700 text-white hover:bg-zinc-900"
            >
              ← Back to Contests
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const diff = difficultyConfig[challenge.difficulty];

  const handleSubmit = async () => {
    if (!challenge || submitting) return;
    setSubmitting(true);
    setAiFeedback(null);
    try {
      const result = await codeSubmission(
        challenge.contestId,
        challenge.id,
        code,
        selectedLanguage,
      );
      setTestResults({
        type: "submit",
        message: "Submitted — awaiting evaluation",
        info: `Submission ID: ${result.submissionId}. Your code will be evaluated by AI shortly.`,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setTestResults({
        type: "submit",
        message: "Submission failed",
        info:
          err?.response?.data?.message ??
          "An unexpected error occurred. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* ── Header ── */}
      <header className="border-b border-zinc-800 bg-black sticky top-0 z-40 flex-shrink-0">
        <div className="px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href={`/contest/${challenge.contestId}/challenges`}
              className="text-zinc-400 hover:text-white text-sm transition flex-shrink-0"
            >
              <ArrowLeft strokeWidth={2.5} />
            </Link>
            <div className="min-w-0">
              <h1 className="text-base font-bold text-white truncate">
                {challenge.title}
              </h1>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span
                  className={`inline-block px-2 py-0.5 rounded-full border text-xs font-semibold ${diff.classes}`}
                >
                  {diff.label}
                </span>
                <div className="flex items-center gap-1 text-yellow-400 text-xs">
                  <Star className="w-3 h-3" />
                  <span className="font-semibold">
                    {challenge.maxPoints} pts
                  </span>
                </div>
                <div className="flex items-center gap-1 text-zinc-500 text-xs">
                  <Clock className="w-3 h-3" />
                  <span>Ends {formatDate(challenge.endAt)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              onClick={handleSubmit}
              disabled={submitting || isSubmitted}
              size="sm"
              className="bg-white/90 hover:bg-white/80 text-zinc-900 font-semibold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  Submitted
                </>
              ) : submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-zinc-600 border-t-zinc-900 rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Submit
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* ── Split Layout ── */}
      <main
        className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0"
        style={{ height: "calc(100vh - 65px)" }}
      >
        {/* ─── LEFT: Problem Panel ─── */}
        <div className="border-r border-zinc-800 overflow-y-auto">
          {/* Tabs */}
          <div className="flex gap-6 px-6 border-b border-zinc-800 sticky top-0 bg-black z-10">
            {(["description", "requirements", "examples"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 text-sm font-semibold capitalize border-b-2 transition ${
                    activeTab === tab
                      ? "border-white text-white"
                      : "border-transparent text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          <div className="p-6 space-y-6">
            {/* ── DESCRIPTION ── */}
            {activeTab === "description" && (
              <>
                <div>
                  <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> Description
                  </h2>
                  <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {challenge.description}
                  </p>
                </div>

                {challenge.constraints && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                      Constraints
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {challenge.constraints}
                    </p>
                  </div>
                )}

                {/* Allowed languages */}
                <div>
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5" /> Allowed Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {challenge.allowedLanguages.map((lang) => (
                      <span
                        key={lang}
                        className="px-2.5 py-1 rounded bg-zinc-800 border border-zinc-700 text-xs text-zinc-300 font-mono"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scoring breakdown */}
                {challenge.evaluationConfig?.scoring && (
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                      Scoring Breakdown
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(challenge.evaluationConfig.scoring).map(
                        ([key, pts]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2"
                          >
                            <span className="text-xs text-zinc-400 capitalize">
                              {key}
                            </span>
                            <span className="text-xs font-bold text-yellow-400">
                              {pts} pts
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Strict rules */}
                {challenge.evaluationConfig?.strictRules?.length ? (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
                    <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5" /> Strict Rules
                    </h3>
                    <ul className="space-y-2">
                      {challenge.evaluationConfig.strictRules.map((rule, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-xs text-zinc-300"
                        >
                          <span className="text-red-400 mt-0.5 flex-shrink-0">
                            •
                          </span>
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </>
            )}

            {/* ── REQUIREMENTS ── */}
            {activeTab === "requirements" && (
              <div>
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Requirements
                </h2>
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                  <pre className="text-sm text-zinc-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {challenge.requirements}
                  </pre>
                </div>
              </div>
            )}

            {/* ── EXAMPLES ── */}
            {activeTab === "examples" && (
              <div>
                <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                  Example
                </h2>
                {challenge.examples ? (
                  <div className="space-y-4">
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                      <p className="text-xs text-zinc-500 font-semibold mb-2">
                        Input
                      </p>
                      <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap">
                        {JSON.stringify(challenge.examples.input, null, 2)}
                      </pre>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4">
                      <p className="text-xs text-zinc-500 font-semibold mb-2">
                        Expected Output
                      </p>
                      <pre className="text-sm text-green-300 font-mono whitespace-pre-wrap">
                        {challenge.examples.expected}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm">No examples provided.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ─── RIGHT: Code Editor ─── */}
        <div className="flex flex-col bg-zinc-950 min-h-0">
          {/* Editor toolbar */}
          <div className="border-b border-zinc-800 px-4 py-2.5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-zinc-500" />
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  setCode(getDefaultCode(e.target.value));
                }}
                className="px-3 py-1 rounded bg-zinc-800 border border-zinc-700 text-sm text-white hover:border-zinc-600 focus:outline-none focus:border-zinc-500 transition"
              >
                {challenge.allowedLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="p-1.5 rounded hover:bg-zinc-800 transition text-zinc-400 hover:text-white"
                title="Copy code"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCode(getDefaultCode(selectedLanguage))}
                className="p-1.5 rounded hover:bg-zinc-800 transition text-zinc-400 hover:text-white"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Code area */}
          <div className="flex-1 overflow-auto p-4 min-h-0">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-white font-mono text-sm resize-none focus:outline-none leading-relaxed"
              spellCheck={false}
              placeholder="Write your solution here..."
            />
          </div>

          {/* Test results panel */}
          {testResults && (
            <div className="border-t border-zinc-800 bg-zinc-900/50 p-4 max-h-52 overflow-y-auto flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold">
                  {testResults.type === "submit"
                    ? "Submission Result"
                    : "Test Results"}
                </h3>
                {!aiFeedback && (
                  <button
                    onClick={() => setTestResults(null)}
                    className="text-zinc-500 hover:text-white transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {testResults.type === "submit" ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400 font-semibold">
                      {testResults.message}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500">{testResults.info}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-zinc-400">
                    {testResults.passed}/{testResults.total} test cases passed
                  </p>
                  {testResults.cases?.map((c: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-zinc-800 rounded px-3 py-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            c.status === "passed"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                        />
                        <span className="text-zinc-300">{c.label}</span>
                      </div>
                      <span className="text-zinc-500 font-mono">
                        {c.output}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {aiFeedback && (
                <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Feedback
                    </h4>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-yellow-400/20 border border-yellow-400/30 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold">
                        Score: {aiFeedback.score} / {challenge.maxPoints} pts
                      </span>
                    </div>
                  </div>
                  <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
                    <p className="text-sm text-zinc-200 leading-relaxed">
                      {aiFeedback.reason}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
