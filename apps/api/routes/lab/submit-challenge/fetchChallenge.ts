import { db } from "@repo/db/db";

export const getChallengeById = async (challengeId: any) => {
  const getChallenge = await db.challenge.findUnique({
    where: {
      id: challengeId,
    },
  });

  if (!getChallenge) return;

  return getChallenge;
};
