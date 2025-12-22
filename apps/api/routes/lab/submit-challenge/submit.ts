import express from "express";
import { getSystemPrompt } from "../../prompt";
import { getChallengeById } from "./fetchChallenge";
import { v4 as uuidV4 } from "uuid";
import { middleware } from "../../middleware/auth";
import { client } from "@repo/redis-stream/redis-client";

export const submitRouter = express.Router();

submitRouter.post("/submit/:challengeId ", middleware, async (req, res) => {
  const userId = req.id;
  const { challengeId, code, language } = req.body;

  if (!challengeId || !code || language) {
    return res.status(400).json({
      message: "Invalid submission",
    });
  }

  const submissionId = uuidV4();
  const challenge = await getChallengeById(challengeId);
  const systemPrompt = getSystemPrompt(challenge);

  const payload = {
    submissionId,
    userId,
    challengeId,
    code,
    language,
    systemPrompt,
    createdAt: Date.now(),
  };

  await client.set(`submission:${submissionId}`, JSON.stringify(payload), {
    EX: 3600,
  });

  await client.lPush("submission_queue", submissionId);

  res.status(200).json({
    submissionId,
    message: "Submission received",
  });
});
