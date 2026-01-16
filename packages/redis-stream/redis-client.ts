import { createClient } from "redis";
import "dotenv/config";

const WORKER_ID = `consumer-worker`;

export const client = await createClient()
  .on("error", (err) => console.log("Redis client error", err))
  .connect();

type SubmissionEvent = {
  submissionId: string;
  contestId: string;
  userId: string;
  challengeId: any;
  code: string;
  language: string;
  systemPrompt: string;
};
type EvaluationResultEvent = {
  result: string;
  userId: string;
  challengeId: any;
};

type AddLeaderBoardEvent = {
  contestId: string;
  score: number;
  userId: string;
};
type AddLeaderBoardToQueueEvent = {
  contestId: string;
  score: any;
  userId: string;
};
type LeaderboardEvent = {
  contestId: string;
  userId: any;
};

export const pushSubmission = async ({
  submissionId,
  contestId,
  userId,
  challengeId,
  code,
  language,
  systemPrompt,
}: SubmissionEvent) => {
  const response = await client.xAdd("submission:stream", "*", {
    submissionId,
    contestId,
    userId,
    challengeId,
    code,
    language,
    systemPrompt,
  });
  return response;
};

export const pullSubmission = async (
  group = "worker-group",
  consumer = WORKER_ID
) => {
  const response = await client.xReadGroup(
    group,
    consumer,
    [{ key: "submission:stream", id: ">" }],
    { COUNT: 1, BLOCK: 5000 }
  );
  return response;
};

export const evaluationNotification = async ({
  result,
  userId,
  challengeId,
}: EvaluationResultEvent) => {
  const response = await client.publish(
    "submission:notification",
    JSON.stringify({ result, userId, challengeId })
  );

  return response;
};

export const ackSubmission = async (messageId: string) => {
  await client.xAck("submission:stream", "worker-group", messageId);
};

export const claimStuckMessage = async () => {
  const pending = await client.xPendingRange(
    "submission:stream",
    "worker-group",
    "-",
    "+",
    10,
    { IDLE: 60_000 }
  );

  for (const msg of pending as any) {
    if (msg.idle > 60_000) {
      await client.xClaim(
        "submission:stream",
        "worker-group",
        WORKER_ID,
        60_000,
        msg.id
      );
    }
  }
};

export const pushLeaderboardEvent = async ({
  contestId,
  userId,
  score,
}: AddLeaderBoardToQueueEvent) => {
  const response = await client.xAdd("leaderboard:event", "*", {
    contestId: String(contestId),
    userId: String(userId),
    score: String(score),
  });
  return response;
};

export const pullLeaderboardEvent = async (
  group = "leaderboard_worker-group",
  consumer = WORKER_ID
) => {
  const response = await client.xReadGroup(
    group,
    consumer,
    [{ key: "leaderboard:event", id: ">" }],
    { COUNT: 1, BLOCK: 5000 }
  );
  return response;
};

export const addToLeaderBoard = async ({
  contestId,
  score,
  userId,
}: AddLeaderBoardEvent) => {
  const reponse = await client.zAdd(`leaderboard:${contestId}`, {
    score,
    value: userId,
  });

  return reponse;
};

export const getLeaderBoard = async (contestId: string) => {
  const response = await client.zRange(`leaderboard:${contestId}`, 0, -1, {
    REV: true,
    //@ts-ignore
    WITHSCORES: true,
  });
  return response;
};

export const getUserRank = async ({ contestId, userId }: LeaderboardEvent) => {
  const rank = await client.zRevRank(`leaderboard:${contestId}`, userId);

  if (rank !== null) {
    return rank + 1;
  }
  return null;
};
export const getUserScore = async ({ contestId, userId }: LeaderboardEvent) => {
  const response = await client.zScore(`leaderboard:${contestId}`, userId);
  return response;
};

export const resetLeaderboard = async (contestId: string) => {
  const response = await client.del(`leaderboard:${contestId}`);
  return response;
};
