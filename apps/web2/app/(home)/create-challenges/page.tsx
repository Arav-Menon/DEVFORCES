import { Suspense } from "react";
import CreateChallengePage from "@/components/createChallengesCompo/createChallenge";

export default function CreateChallenge() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="h-8 w-8 border-2 border-zinc-600 border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <CreateChallengePage />
    </Suspense>
  );
}
