'use client';

import Link from 'next/link';
import { Crown, ChevronRight } from 'lucide-react';

interface LeaderboardUser {
  rank: number;
  username: string;
  rating: number;
  isCurrentUser?: boolean;
}

interface LeaderboardPreviewProps {
  users: LeaderboardUser[];
  currentUserRank?: number;
}

export function LeaderboardPreview({ users, currentUserRank }: LeaderboardPreviewProps) {
  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          Global Leaderboard
        </h3>
        <Link href="/leaderboard" className="text-blue-400 hover:text-blue-300 transition text-sm flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="divide-y divide-zinc-800">
        {users.map((user) => (
          <Link key={user.rank} href={`/profile/${user.username}`}>
            <div className={`px-6 py-4 hover:bg-zinc-800/50 transition flex items-center justify-between ${
              user.isCurrentUser ? 'bg-blue-500/10 border-l-2 border-l-blue-500' : ''
            }`}>
              <div className="flex items-center gap-4 flex-1">
                <span className="text-lg font-bold text-zinc-400 w-8">
                  {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                </span>
                <div>
                  <p className={`font-semibold ${user.isCurrentUser ? 'text-blue-400' : 'text-white'}`}>
                    {user.username}
                    {user.isCurrentUser && ' (You)'}
                  </p>
                </div>
              </div>
              <span className="text-lg font-bold text-yellow-400">{user.rating}</span>
            </div>
          </Link>
        ))}
      </div>

      {currentUserRank && currentUserRank > 5 && (
        <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-950 text-center">
          <p className="text-sm text-zinc-400">
            Your Rank: <span className="text-blue-400 font-bold">#{currentUserRank}</span>
          </p>
        </div>
      )}
    </div>
  );
}
