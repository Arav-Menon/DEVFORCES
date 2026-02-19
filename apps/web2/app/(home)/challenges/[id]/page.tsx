import ChallengesPage from "@/components/challenges/challengesCompo";
import ContestChallengePage from "../../contests/[Id]/page";

export default function Challenges() {
  return (
    <>
      <ChallengesPage
        params={{
          id: "",
        }}
      />
    </>
  );
}
