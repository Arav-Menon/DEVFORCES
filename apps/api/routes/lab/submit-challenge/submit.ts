import express from "express";
import { getSystemPrompt } from "../../prompt";
import { getChallengeById } from "./fetchId";
import { v4 as uuidV4 } from "uuid";
import { middleware } from "../../../middleware/auth";
import { pushSubmission } from "@repo/redis-stream/redis-client";
import { submitLimiter } from "@repo/common/rateLimit";
import { submit_metrics_middleware } from "../../../middleware/metrics";
import { db } from "@repo/db/db";

export const submitRouter = express.Router();

submitRouter.use(submit_metrics_middleware);

submitRouter.post(
  "/submit/:contestId/:challengeId",
  middleware,
  submitLimiter,
  async (req, res) => {
    const userId = req.user?.id;
    const challengeId = req.params.challengeId as string;
    const contestId = req.params.contestId as string;
    const { code, language } = req.body;

    try {
      if (!challengeId || !code || !language || !userId || !contestId) {
        return res.status(400).json({
          message: "Invalid submission",
        });
      }

      const submissionId = uuidV4();
      const challenge = await getChallengeById(challengeId);
      const systemPrompt = getSystemPrompt(challenge);

      const payload = {
        submissionId,
        contestId,
        userId: userId as string,
        challengeId,
        code,
        language,
        systemPrompt,
      };

      await db.submission.create({
        data: {
          submissionId: payload.submissionId,
          userId: payload.userId,
          challengeId: payload.challengeId,
          status: "PENDING",
        },
      });

      const submissionResult = await pushSubmission(payload);

      console.log(submissionResult);

      res.status(200).json({
        submissionId,
        message: "Submission received",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);
