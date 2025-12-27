import { createClient } from "redis";
import "dotenv/config";
import os from "os";
import crypto from "crypto";

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
export const pushSubmission = async ({
  submissionId,
  userId,
  challengeId,
  code,
  language,
  systemPrompt,
}: SubmissionEvent) => {
  await client.xAdd("submission:stream", "*", {
    submissionId,
    userId,
    challengeId,
    code,
    language,
    systemPrompt,
  });
};

console.log(pushSubmission);

export const pullSubmission = async (
  group = "worker-group",
  consumer = `worker-${os.hostname()}-${crypto.randomUUID()}`
) => {
  const result = await client.xReadGroup(
    group,
    consumer,
    [{ key: "submission:stream", id: ">" }],
    { COUNT: 1, BLOCK: 5000 }
  );
  return result;
};
console.log(pullSubmission);
