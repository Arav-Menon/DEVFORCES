import express from "express";
import { getSystemPrompt } from "../../prompt";
import { getChallengeById } from "./fetchChallenge";
import { v4 as uuidV4 } from "uuid";
import { middleware } from "../../middleware/auth";

export const submitRouter = express.Router();

submitRouter.post("/submit/:challengeId ", middleware, async (req, res) => {
  const { challengeId, code, language } = req.body;

  if (!challengeId || !code || language) {
    return res.status(400).json({
      message: "Invalid submission",
    });
  }

  const submissionId = uuidV4();
  const challenge = await getChallengeById(challengeId);
  const systemPrompt = getSystemPrompt(challenge);
});
