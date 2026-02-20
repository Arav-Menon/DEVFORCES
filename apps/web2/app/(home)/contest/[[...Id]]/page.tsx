"use client";
import { use } from "react";
import ContestDetailPage from "@/components/contests/contest_challenges_component";
import ContestsPage from "@/components/contests/contests";

export default function ContestChallengePage({ params }: { params: Promise<{ Id?: string[] }> }) {
  const { Id } = use(params);
  const contestId = Id?.[0];

  // No ID in URL → show the contests list
  if (!contestId) return <ContestsPage />;

  return <ContestDetailPage contestId={contestId} />;
}