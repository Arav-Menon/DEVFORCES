import { db } from "@repo/db/db";
import { client } from "@repo/redis-stream/redis-client";
import { challengeIdKey } from "@repo/common/index";

export const getChallengeById = async (challengeId: string) => {
  const cacheKey = challengeIdKey(challengeId);
  try {
    const cachedData = await client.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (redisError) {
    console.error("Redis error in getChallengeById:", redisError);
  }

  const challenge = await db.challenge.findUnique({
    where: {
      id: challengeId,
    },
  });

  if (!challenge) return null;

  try {
    await client.setEx(cacheKey, 3600, JSON.stringify(challenge));
  } catch (redisError) {
    console.error("Redis SET error in getChallengeById:", redisError);
  }

  return challenge;
};
