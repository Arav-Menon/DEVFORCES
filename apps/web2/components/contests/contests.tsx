"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, CalendarDays, ExternalLink } from "lucide-react";
import { fetchContest } from "@/utils/challenge_api/weekly-devforce-contests/api";

interface Contest {
  id: string;
  title: string;
  slug: string;
  startTime: string;
  status: "ONGOING" | "UPCOMING" | "ENDED";
}

type Tab = "ONGOING" | "UPCOMING" | "ENDED";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function StatusBadge({ status }: { status: Contest["status"] }) {
  const configs = {
    ONGOING: {
      label: "Live",
      classes: "bg-green-500/10 text-green-400 border-green-500/30",
      dot: "bg-green-400 animate-pulse",
    },
    UPCOMING: {
      label: "Upcoming",
      classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      dot: "bg-yellow-400",
    },
    ENDED: {
      label: "Ended",
      classes: "bg-zinc-500/10 text-zinc-400 border-zinc-500/30",
      dot: "bg-zinc-500",
    },
  };
  const c = configs[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold ${c.classes}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("UPCOMING");
  const [searchQuery, setSearchQuery] = useState("");
  const [allContests, setAllContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchContest();
        setAllContests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const tabs: Tab[] = ["ONGOING", "UPCOMING", "ENDED"];

  const filtered = allContests
    .filter((c) => c.status === activeTab)
    .filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const tabLabel: Record<Tab, string> = {
    ONGOING: "Ongoing",
    UPCOMING: "Upcoming",
    ENDED: "Past",
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 sticky top-0 z-40 bg-black/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-1">Contests</h1>
              <p className="text-zinc-400 text-sm">Compete with developers worldwide</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search contests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-zinc-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-semibold text-sm transition ${
                  activeTab === tab
                    ? "border-white text-white"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                {tabLabel[tab]}
                {!loading && (
                  <span className="ml-2 text-xs text-zinc-500">
                    ({allContests.filter((c) => c.status === tab).length})
                  </span>
                )}
              </button>
            ))}
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
                className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 animate-pulse"
              >
                <div className="h-5 w-56 bg-zinc-800 rounded mb-3" />
                <div className="h-3 w-40 bg-zinc-800 rounded" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <CalendarDays className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-400 text-lg mb-1">No {tabLabel[activeTab].toLowerCase()} contests</p>
            <p className="text-zinc-600 text-sm">Check back later or explore other tabs</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((contest) => (
              <div
                key={contest.slug}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="text-base font-semibold text-white group-hover:text-white/80 transition truncate">
                        {contest.title}
                      </h3>
                      <StatusBadge status={contest.status} />
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                      <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        {contest.status === "UPCOMING" ? "Starts" : "Started"}:{" "}
                        <span className="text-zinc-300">{formatDate(contest.startTime)}</span>
                      </span>
                    </div>
                    <span className="text-xs text-zinc-600 font-mono mt-1 block">
                      /{contest.slug}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="flex-shrink-0">
                    <Link href={`/contest/${contest.id}/challenges`}>
                      <Button
                        size="sm"
                        className={
                          contest.status === "ONGOING"
                            ? "bg-white/90 hover:bg-white/80 text-zinc-900 font-semibold"
                            : "bg-zinc-800 hover:bg-zinc-700 text-white"
                        }
                      >
                        {contest.status === "ONGOING"
                          ? "Enter"
                          : contest.status === "UPCOMING"
                          ? "View Details"
                          : "View Results"}
                        <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
