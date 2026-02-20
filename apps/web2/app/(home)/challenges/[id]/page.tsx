"use client";
import { use } from "react";
import ChallengesPage from "@/components/challenges/challengesCompo";

export default function Challenges({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <ChallengesPage slug={id} />;
}
