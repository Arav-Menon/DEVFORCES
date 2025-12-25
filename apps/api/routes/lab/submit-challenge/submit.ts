import express from "express";
import { getSystemPrompt } from "../../prompt";
import { getChallengeById } from "./fetchChallenge";
import { v4 as uuidV4 } from "uuid";
import { middleware } from "../../middleware/auth";
import { client, pushSubmission } from "@repo/redis-stream/redis-client";

export const submitRouter = express.Router();

submitRouter.post("/submit/:challengeId", middleware, async (req, res) => {
  const userId = req.id;
  const challengeId = req.params.challengeId;
  const { code, language } = req.body;

  if (!challengeId || !code || !language || !userId) {
    return res.status(400).json({
      message: "Invalid submission",
    });
  }

  const submissionId = uuidV4();
  const challenge = await getChallengeById(challengeId);
  const systemPrompt = getSystemPrompt(challenge);

  const payload = {
    submissionId,
    userId: userId as string,
    challengeId,
    code,
    language,
    systemPrompt,
  };

  await client.set(`submission:${submissionId}`, JSON.stringify(payload), {
    EX: 3600,
  });

  const submissionResult = await pushSubmission(payload);

  console.log(submissionResult);

  res.status(200).json({
    submissionId,
    message: "Submission received",
  });
});
