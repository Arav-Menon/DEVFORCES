'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Clock, Users, Trophy } from 'lucide-react';

interface ContestWidgetProps {
  contestId: string;
  name: string;
  timeRemaining: string;
  userRank: number;
  totalParticipants: number;
  status: 'ongoing' | 'upcoming' | 'ended';
}

export function ContestWidget({
  contestId,
  name,
  timeRemaining,
  userRank,
  totalParticipants,
  status,
}: ContestWidgetProps) {
  return (
    <Link href={`/contests/${contestId}`}>
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-8 hover:border-zinc-800 transition cursor-pointer">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 mb-4">
              <span className="text-xs font-semibold text-blue-400">
                {status === 'ongoing' ? '🔴 Ongoing' : status === 'upcoming' ? '🟡 Upcoming' : '⚫ Ended'}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          </div>
          <Trophy className="w-6 h-6 text-yellow-500" />
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-zinc-400">
            <Clock className="w-4 h-4 text-zinc-200" />
            <span className="text-sm">Time Remaining: <span className="text-white font-semibold">{timeRemaining}</span></span>
          </div>
          <div className="flex items-center gap-3 text-zinc-400">
            <Users className="w-4 h-4 text-zinc-200" />
            <span className="text-sm">Your Rank: <span className="text-white font-semibold">#{userRank}</span> / {totalParticipants}</span>
          </div>
        </div>

        <Button className="w-full bg-white/90 hover:bg-white/80 text-zinc-900">
          Continue Contest
        </Button>
      </div>
    </Link>
  );
}
