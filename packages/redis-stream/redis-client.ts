import { createClient } from "redis";
import "dotenv/config";

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
  await client.xAdd("submisson:stream", "*", {
    submissionId,
    userId,
    challengeId,
    code,
    language,
    systemPrompt,
  });
};
