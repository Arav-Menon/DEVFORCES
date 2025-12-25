import { db } from "@repo/db/db";

export const getChallengeById = async (challengeId: string) => {
  const getChallenge = await db.challenge.findUnique({
    where: {
      id: challengeId,
    },
  });

  if (!getChallenge) return;

  return getChallenge;
};
