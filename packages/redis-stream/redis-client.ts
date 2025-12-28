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
  consumer = `worker-${os.hostname()}-${crypto.randomUUID()}`
) => {
  const response = await client.xReadGroup(
    group,
    consumer,
    [{ key: "submission:stream", id: ">" }],
    { COUNT: 1, BLOCK: 5000 }
  );
  return response;
};

export const publishEvaluationResult = async ({
  result,
  userId,
  challengeId,
}: EvaluationResultEvent) => {
  const response = await client.xAdd("submisson:notification", "*", {
    result,
    userId,
    challengeId,
  });
  return response;
};

export const broadCastEvaluationResult = async (
  group = "realtime-group",
  consumer = `woker-${os.hostname()}-${crypto.randomUUID()}`
) => {
  const response = await client.xReadGroup(
    group,
    consumer,
    [{ key: "submisson:notification", id: ">" }],
    { COUNT: 1, BLOCK: 5000 }
  );
  return response;
};
