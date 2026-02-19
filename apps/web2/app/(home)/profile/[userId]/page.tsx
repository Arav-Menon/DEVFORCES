'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Mail, MapPin, Cake, Code, Trophy, TrendingUp, Share2 } from 'lucide-react';

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [activeTab, setActiveTab] = useState('overview');

  const profile = {
    username: params.username,
    name: 'Alex Johnson',
    avatar: 'AJ',
    bio: 'Passionate about competitive programming and system design. Always learning.',
    location: 'San Francisco, CA',
    email: 'alex@example.com',
    joinDate: 'Joined 2 years ago',
    rating: 2156,
    rank: 'Grandmaster',
    problemsSolved: 847,
    totalSubmissions: 3241,
    acceptanceRate: 26.1,
    contestsParticipated: 42,
    contestRating: 2156,
    bestRating: 2287,
    badges: [
      { name: 'Century', description: 'Solved 100 problems' },
      { name: 'Master', description: 'Solved 500 problems' },
      { name: 'Champion', description: 'Won a contest' },
      { name: 'Rising Star', description: '500 rating gain in 90 days' },
    ],
    recentSubmissions: [
      { problem: 'Two Sum', verdict: 'Accepted', time: '2 hours ago', runtime: '45ms' },
      { problem: 'Add Two Numbers', verdict: 'Accepted', time: '5 hours ago', runtime: '52ms' },
      { problem: 'Longest Substring', verdict: 'Wrong Answer', time: '1 day ago', runtime: 'N/A' },
      { problem: 'Median of Two Arrays', verdict: 'Time Limit Exceeded', time: '2 days ago', runtime: 'N/A' },
    ],
    activityHeatmap: Array(52).fill(0).map(() => Math.floor(Math.random() * 5)),
    solvedByCategory: [
      { category: 'Array', solved: 120, total: 200 },
      { category: 'String', solved: 95, total: 180 },
      { category: 'Tree', solved: 87, total: 150 },
      { category: 'Graph', solved: 76, total: 130 },
      { category: 'DP', solved: 98, total: 160 },
    ],
  };

  const heatmapWeeks = Array(52).fill(0).map((_, i) => {
    const week = [];
    for (let day = 0; day < 7; day++) {
      week.push(i * 7 + day);
    }
    return week;
  });

  const getActivityColor = (value: number) => {
    if (value === 0) return 'bg-zinc-800';
    if (value === 1) return 'bg-green-900';
    if (value === 2) return 'bg-green-700';
    if (value === 3) return 'bg-green-600';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-black sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
            {/* Avatar and Basic Info */}
            <div className="flex gap-6 items-start flex-1">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl font-bold flex-shrink-0">
                {profile.avatar}
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-1">{profile.name}</h1>
                <p className="text-blue-400 text-lg mb-3">@{profile.username}</p>
                <p className="text-zinc-400 mb-4">{profile.bio}</p>
                <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Cake className="w-4 h-4" />
                    {profile.joinDate}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                Follow
              </Button>
              <Button variant="outline" className="border-zinc-600 text-white hover:bg-zinc-900">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="border border-zinc-800 rounded-lg p-4 hover:border-blue-500/30 transition">
              <p className="text-zinc-400 text-sm mb-2">Rating</p>
              <p className="text-2xl font-bold text-blue-400">{profile.rating}</p>
              <p className="text-xs text-zinc-500 mt-2">{profile.rank}</p>
            </div>
            <div className="border border-zinc-800 rounded-lg p-4 hover:border-blue-500/30 transition">
              <p className="text-zinc-400 text-sm mb-2">Problems Solved</p>
              <p className="text-2xl font-bold text-green-400">{profile.problemsSolved}</p>
              <p className="text-xs text-zinc-500 mt-2">{profile.acceptanceRate}% acceptance</p>
            </div>
            <div className="border border-zinc-800 rounded-lg p-4 hover:border-blue-500/30 transition">
              <p className="text-zinc-400 text-sm mb-2">Submissions</p>
              <p className="text-2xl font-bold text-purple-400">{profile.totalSubmissions}</p>
            </div>
            <div className="border border-zinc-800 rounded-lg p-4 hover:border-blue-500/30 transition">
              <p className="text-zinc-400 text-sm mb-2">Contests</p>
              <p className="text-2xl font-bold text-yellow-400">{profile.contestsParticipated}</p>
              <p className="text-xs text-zinc-500 mt-2">{profile.bestRating} best</p>
            </div>
            <div className="border border-zinc-800 rounded-lg p-4 hover:border-blue-500/30 transition">
              <p className="text-zinc-400 text-sm mb-2">Badges</p>
              <p className="text-2xl font-bold text-amber-400">{profile.badges.length}</p>
              <p className="text-xs text-zinc-500 mt-2">Earned</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-zinc-800 mb-8 overflow-x-auto">
          {['overview', 'submissions', 'badges', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-1 py-4 capitalize font-semibold transition whitespace-nowrap ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Solved by Category */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-6">Problems Solved by Category</h2>
                <div className="space-y-4">
                  {profile.solvedByCategory.map((cat) => {
                    const percentage = (cat.solved / cat.total) * 100;
                    return (
                      <div key={cat.category}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium">{cat.category}</span>
                          <span className="text-sm text-zinc-400">{cat.solved}/{cat.total}</span>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Badges */}
              <div>
                <h2 className="text-xl font-bold mb-6">Badges</h2>
                <div className="space-y-3">
                  {profile.badges.map((badge) => (
                    <div key={badge.name} className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-800 hover:border-blue-500/30 transition">
                      <p className="font-semibold text-sm text-blue-400">{badge.name}</p>
                      <p className="text-xs text-zinc-400 mt-1">{badge.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Recent Submissions</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left py-4 px-4 text-zinc-400 font-medium">Problem</th>
                      <th className="text-left py-4 px-4 text-zinc-400 font-medium">Verdict</th>
                      <th className="text-left py-4 px-4 text-zinc-400 font-medium">Runtime</th>
                      <th className="text-left py-4 px-4 text-zinc-400 font-medium">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profile.recentSubmissions.map((submission, idx) => (
                      <tr key={idx} className="border-b border-zinc-800 hover:bg-zinc-900/30 transition">
                        <td className="py-4 px-4">
                          <Link href={`/problems/1`} className="text-blue-400 hover:text-blue-300">
                            {submission.problem}
                          </Link>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            submission.verdict === 'Accepted' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {submission.verdict}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-zinc-400">{submission.runtime}</td>
                        <td className="py-4 px-4 text-zinc-400">{submission.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'badges' && (
            <div>
              <h2 className="text-xl font-bold mb-6">All Badges</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profile.badges.map((badge) => (
                  <div key={badge.name} className="p-6 rounded-lg border border-zinc-800 hover:border-blue-500/30 transition text-center">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full mx-auto mb-3 flex items-center justify-center text-lg">
                      🏆
                    </div>
                    <p className="font-semibold text-sm mb-1">{badge.name}</p>
                    <p className="text-xs text-zinc-400">{badge.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Activity Heatmap</h2>
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6">
                <div className="flex gap-2 flex-wrap">
                  {profile.activityHeatmap.map((activity, idx) => (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-sm ${getActivityColor(activity)} hover:ring-2 hover:ring-blue-400 transition cursor-pointer`}
                      title={`${activity} submissions on day ${idx + 1}`}
                    ></div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-zinc-400">
                  <span>Less</span>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-sm bg-zinc-800"></div>
                    <div className="w-3 h-3 rounded-sm bg-green-900"></div>
                    <div className="w-3 h-3 rounded-sm bg-green-700"></div>
                    <div className="w-3 h-3 rounded-sm bg-green-600"></div>
                    <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
