import { db } from "@repo/db/db";

export const getChallengeById = async (challengeId: string) => {
  const getChallengeId = await db.challenge.findUnique({
    where: {
      id: challengeId,
    },
  });

  if (!getChallengeId) return;

  return getChallengeId;
};