"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronDown, Copy, RotateCcw, Play, Send, X } from "lucide-react";

export default function ChallengesPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("python3");
  const [code, setCode] = useState(
    "def twoSum(nums, target):\n    # Your solution here\n    pass",
  );
  const [testResults, setTestResults] = useState<any>(null);

  const problem = {
    id: params.id,
    name: "Two Sum",
    difficulty: "Easy",
    acceptance: 47.2,
    likes: 12234,
    dislikes: 234,
    description: `Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation:
          "The sum of 2 and 7 is 9. Therefore, index 0 and index 1 are returned.",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation:
          "The sum of 2 and 4 is 6. Therefore, index 1 and index 2 are returned.",
      },
    ],
    tags: ["Array", "Hash Table"],
    relatedProblems: [
      { id: 1, name: "Two Sum II - Input Array Is Sorted" },
      { id: 2, name: "Two Sum IV - Input is a BST" },
      { id: 3, name: "Two Sum III - Data structure Design" },
    ],
    testCases: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        status: "passed",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        status: "passed",
      },
      { input: "nums = [3,3], target = 6", output: "[0,1]", status: "pending" },
    ],
  };

  const languages = ["python3", "java", "cpp", "javascript", "go", "rust"];

  const handleRun = () => {
    setTestResults({
      status: "success",
      passed: 2,
      total: 3,
      cases: [
        { input: "[2,7,11,15], 9", output: "[0, 1]", status: "passed" },
        { input: "[3,2,4], 6", output: "[1, 2]", status: "passed" },
        {
          input: "[3,3], 6",
          output: "Runtime Error: index out of range",
          status: "failed",
        },
      ],
    });
  };

  const handleSubmit = () => {
    setTestResults({
      status: "success",
      passed: 120,
      total: 123,
      message: "Accepted",
      runtime: "45ms (faster than 87% of submissions)",
      memory: "16.2MB (better than 92% of submissions)",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <Link
              href="/contests"
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              ← Back
            </Link>
            <h1 className="text-2xl font-bold mt-2">{problem.name}</h1>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-zinc-600 text-white hover:bg-zinc-900"
            >
              Discuss
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              Submit
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[calc(100vh-80px)]">
        {/* Left Panel - Problem Description */}
        <div className="border-r border-zinc-800 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Problem Meta */}
            <div className="flex flex-wrap items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  problem.difficulty === "Easy"
                    ? "bg-green-400/10 text-green-400"
                    : problem.difficulty === "Medium"
                      ? "bg-yellow-400/10 text-yellow-400"
                      : "bg-red-400/10 text-red-400"
                }`}
              >
                {problem.difficulty}
              </span>
              <span className="text-sm text-zinc-400">
                {problem.acceptance}% Acceptance
              </span>
              <span className="text-sm text-zinc-400">❤️ {problem.likes}</span>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-zinc-800 pb-0">
              {["description", "submissions", "discussion"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-1 py-3 capitalize font-semibold transition border-b-2 ${
                    activeTab === tab
                      ? "text-blue-400 border-blue-400"
                      : "text-zinc-400 border-transparent hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Description Tab */}
            {activeTab === "description" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold mb-3">Description</h2>
                  <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {problem.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Constraints</h3>
                  <ul className="space-y-2">
                    {problem.constraints.map((constraint, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-zinc-400 flex gap-2"
                      >
                        <span>•</span>
                        <span>{constraint}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold mb-4">Examples</h3>
                  <div className="space-y-4">
                    {problem.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-4"
                      >
                        <p className="text-sm font-mono text-blue-400 mb-2">
                          Example {idx + 1}:
                        </p>
                        <p className="text-sm text-zinc-300 mb-3">
                          <span className="font-semibold text-white">
                            Input:
                          </span>{" "}
                          {example.input}
                        </p>
                        <p className="text-sm text-zinc-300 mb-3">
                          <span className="font-semibold text-white">
                            Output:
                          </span>{" "}
                          {example.output}
                        </p>
                        <p className="text-sm text-zinc-400">
                          <span className="font-semibold text-white">
                            Explanation:
                          </span>{" "}
                          {example.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold mb-3">Related Problems</h3>
                  <div className="space-y-2">
                    {problem.relatedProblems.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 rounded bg-zinc-900/20 hover:bg-zinc-900/40 transition cursor-pointer"
                      >
                        <Link
                          href={`/problems/${p.id}`}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          {p.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "submissions" && (
              <div className="py-8 text-center">
                <p className="text-zinc-400">No submissions yet</p>
                <p className="text-sm text-zinc-500 mt-2">
                  Submit your solution to see results here
                </p>
              </div>
            )}

            {activeTab === "discussion" && (
              <div className="py-8 text-center">
                <p className="text-zinc-400">Discussion section</p>
                <p className="text-sm text-zinc-500 mt-2">
                  Community discussions coming soon
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="bg-zinc-900/50 flex flex-col">
          {/* Editor Header */}
          <div className="border-b border-zinc-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">Language</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1 rounded bg-zinc-800 border border-zinc-700 text-sm text-white hover:border-zinc-600 focus:outline-none focus:border-blue-500 transition"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded hover:bg-zinc-800 transition"
                title="Copy"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded hover:bg-zinc-800 transition"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Code Editor Area */}
          <div className="flex-1 overflow-auto p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
              spellCheck="false"
            />
          </div>

          {/* Action Buttons */}
          <div className="border-t border-zinc-800 p-4 flex gap-2">
            <Button
              onClick={handleRun}
              className="flex-1 bg-zinc-800 text-white hover:bg-zinc-700 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Run
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit
            </Button>
          </div>

          {/* Test Results */}
          {testResults && (
            <div className="border-t border-zinc-800 p-4 bg-zinc-900/30 max-h-48 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Test Results</h3>
                <button
                  onClick={() => setTestResults(null)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {testResults.message ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span className="text-green-400 font-bold">
                      {testResults.message}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">{testResults.runtime}</p>
                  <p className="text-sm text-zinc-400">{testResults.memory}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-400">
                      {testResults.passed}/{testResults.total} test cases passed
                    </span>
                  </div>
                  {testResults.cases.map((testCase: any, idx: any) => (
                    <div key={idx} className="text-xs p-2 rounded bg-zinc-800">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`w-2 h-2 rounded-full ${testCase.status === "passed" ? "bg-green-400" : "bg-red-400"}`}
                        ></span>
                        <span className="text-zinc-300">
                          Test case {idx + 1}
                        </span>
                      </div>
                      <div className="text-zinc-400">
                        Output: {testCase.output}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
