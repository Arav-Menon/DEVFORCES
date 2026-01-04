import { createClient } from "redis";
import "dotenv/config";
import os from "os";
import crypto from "crypto";

const WORKER_ID = `worker-${os.hostname()}-${crypto.randomUUID()}`;

export const client = await createClient()
  .on("error", (err) => console.log("Redis client error", err))
  .connect();

type SubmissionEvent = {
  submissionId: string;
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

export const pushSubmission = async ({
  submissionId,
  userId,
  challengeId,
  code,
  language,
  systemPrompt,
}: SubmissionEvent) => {
  const response = await client.xAdd("submission:stream", "*", {
    submissionId,
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

export const ackSubmission = (messageId: string) => {
  return client.xAck("submission:stream", "worker-group", messageId);
};

export const claimStuckMessage = async () => {
  const pending = await client.xPending("submission:stream", "worker-group");

  for (const msg of pending as any) {
    if (msg.idle > 60_000) {
      await client.xClaim(
        "submission:stream",
        "worker-group",
        WORKER_ID,
        60_000,
        [msg.id]
      );
    }
  }
};
