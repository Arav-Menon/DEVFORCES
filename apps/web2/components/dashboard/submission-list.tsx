'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Submission {
  id: string;
  problemTitle: string;
  status: 'Accepted' | 'Wrong Answer' | 'Runtime Error' | 'Time Limit Exceeded';
  language: string;
  time: string;
}

interface SubmissionListProps {
  submissions: Submission[];
}

const statusColor = {
  'Accepted': 'text-green-400 bg-green-400/10',
  'Wrong Answer': 'text-red-400 bg-red-400/10',
  'Runtime Error': 'text-orange-400 bg-orange-400/10',
  'Time Limit Exceeded': 'text-yellow-400 bg-yellow-400/10',
};

export function SubmissionList({ submissions }: SubmissionListProps) {
  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Recent Submissions</h3>
        <Link href="/submissions" className="text-blue-400 hover:text-blue-300 transition text-sm flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950">
              <th className="px-6 py-4 text-left text-zinc-400 font-semibold">Problem</th>
              <th className="px-6 py-4 text-left text-zinc-400 font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-zinc-400 font-semibold">Language</th>
              <th className="px-6 py-4 text-left text-zinc-400 font-semibold">Time</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition">
                <td className="px-6 py-4">
                  <Link href={`/problems/${submission.problemTitle}`} className="text-white hover:text-blue-400 transition">
                    {submission.problemTitle}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${statusColor[submission.status]}`}>
                    {submission.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-400">{submission.language}</td>
                <td className="px-6 py-4 text-zinc-400">{submission.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
