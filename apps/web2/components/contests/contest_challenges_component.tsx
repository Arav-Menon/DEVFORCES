'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, Users, Award, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function ContestDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('problems');

  // Mock data
  const contest = {
    id: params.id,
    name: 'DevForce Weekly #100',
    status: 'LIVE',
    timeLeft: '1h 58m',
    startTime: '2 hours ago',
    endTime: 'Dec 20, 2026 at 14:00',
    participants: 3241,
    problems: [
      {
        id: 1,
        name: 'Two Sum',
        difficulty: 'Easy',
        acceptance: 47.2,
        points: 100,
        status: 'Solved',
        submissions: 1,
      },
      {
        id: 2,
        name: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        acceptance: 32.1,
        points: 200,
        status: 'Attempted',
        submissions: 3,
      },
      {
        id: 3,
        name: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        acceptance: 24.5,
        points: 300,
        status: 'Not started',
        submissions: 0,
      },
      {
        id: 4,
        name: 'Regular Expression Matching',
        difficulty: 'Hard',
        acceptance: 26.8,
        points: 300,
        status: 'Not started',
        submissions: 0,
      },
    ],
    leaderboard: [
      { rank: 1, name: 'AlexCoder', score: 600, problems: 3 },
      { rank: 2, name: 'TechNinja', score: 500, problems: 2 },
      { rank: 3, name: 'CodeMaster', score: 500, problems: 2 },
      { rank: 4, name: 'DebugDemon', score: 400, problems: 2 },
      { rank: 5, name: 'ByteWizard', score: 300, problems: 1 },
    ],
    rules: [
      'Submissions are judged on an online judge and will be checked immediately.',
      'The score will be reduced by 1 point for each minute passed since the start.',
      'You can view your current score at any time.',
      'Cheating and plagiarism are strictly prohibited.',
    ],
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400 bg-green-400/10';
      case 'Medium':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'Hard':
        return 'text-red-400 bg-red-400/10';
      default:
        return 'text-zinc-400 bg-zinc-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Solved':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'Attempted':
        return <div className="w-5 h-5 rounded-full border-2 border-yellow-400 flex items-center justify-center"><div className="w-2 h-2 bg-yellow-400 rounded-full"></div></div>;
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-zinc-600"></div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <Link href="/contests" className="text-blue-400 hover:text-blue-300 text-sm mb-3 inline-block">
                ← Back to Contests
              </Link>
              <h1 className="text-3xl font-bold mb-3">{contest.name}</h1>
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-green-400">LIVE</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Clock className="w-4 h-4" />
                  {contest.timeLeft} left
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <Users className="w-4 h-4" />
                  {contest.participants} participants
                </div>
              </div>
            </div>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              Resume Contest
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-t border-zinc-800 pt-4">
            {['problems', 'leaderboard', 'rules'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-1 py-1 capitalize font-semibold transition ${
                  activeTab === tab
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'problems' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Problems</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800">
                        <th className="text-left py-4 px-4 text-zinc-400 font-medium">Status</th>
                        <th className="text-left py-4 px-4 text-zinc-400 font-medium">Problem</th>
                        <th className="text-left py-4 px-4 text-zinc-400 font-medium">Difficulty</th>
                        <th className="text-left py-4 px-4 text-zinc-400 font-medium">Acceptance</th>
                        <th className="text-left py-4 px-4 text-zinc-400 font-medium">Points</th>
                        <th className="text-left py-4 px-4 text-zinc-400 font-medium">Submissions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contest.problems.map((problem, idx) => (
                        <tr
                          key={problem.id}
                          className="border-b border-zinc-800 hover:bg-zinc-900/30 transition"
                        >
                          <td className="py-4 px-4">
                            {getStatusIcon(problem.status)}
                          </td>
                          <td className="py-4 px-4">
                            <Link href={`/challenges/${problem.id}`}>
                              <span className="hover:text-blue-400 transition cursor-pointer font-medium">
                                {problem.name}
                              </span>
                            </Link>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-zinc-400">{problem.acceptance.toFixed(1)}%</td>
                          <td className="py-4 px-4 font-semibold">{problem.points}</td>
                          <td className="py-4 px-4 text-zinc-400">{problem.submissions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'leaderboard' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Live Leaderboard</h2>
                <div className="space-y-2">
                  {contest.leaderboard.map((entry, idx) => (
                    <div
                      key={entry.rank}
                      className="flex items-center gap-4 p-4 rounded-lg border border-zinc-800 hover:border-blue-500/30 transition"
                    >
                      <div className="text-center font-bold w-12">
                        {entry.rank === 1 && <span className="text-yellow-400">🥇</span>}
                        {entry.rank === 2 && <span className="text-gray-300">🥈</span>}
                        {entry.rank === 3 && <span className="text-orange-600">🥉</span>}
                        {entry.rank > 3 && <span>{entry.rank}</span>}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{entry.name}</p>
                        <p className="text-sm text-zinc-400">{entry.problems} problems solved</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-blue-400">{entry.score}</p>
                        <p className="text-xs text-zinc-400">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">Contest Rules</h2>
                <div className="space-y-4">
                  {contest.rules.map((rule, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-lg border border-zinc-800">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {idx + 1}
                      </div>
                      <p className="text-zinc-300">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Leaderboard Preview */}
          <div className="lg:col-span-1">
            <div className="border border-zinc-800 rounded-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                Top Performers
              </h3>
              <div className="space-y-3">
                {contest.leaderboard.slice(0, 3).map((entry) => (
                  <div key={entry.rank} className="flex items-center justify-between p-3 rounded bg-zinc-900/30">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-yellow-400">{entry.rank}</span>
                      <span className="font-medium">{entry.name}</span>
                    </div>
                    <span className="text-blue-400 font-bold">{entry.score}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30">
                View Full Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
