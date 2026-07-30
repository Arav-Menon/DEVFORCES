import express from "express";
import { challengeSchema } from "@repo/common/validation";
import { db } from "@repo/db/db";
import { middleware } from "../../../middleware/auth";
import { authorizeRole } from "../../../middleware/authorizeRole";
import { challengeLimiter } from "@repo/common/rateLimit";
import { challenge_metrics_middleware } from "../../../middleware/metrics";
import { challengeDbQueryDurationMs } from "@repo/common/observability";

export const challengeRouter = express.Router();

challengeRouter.use(challenge_metrics_middleware);

challengeRouter.post(
  "/:contestId/challenge",
  middleware,
  challengeLimiter,
  authorizeRole(["ADMIN", "CREATOR"]),
  async (req, res) => {
    const contestId = req.params.contestId;
    const body = req.body;
    const result = challengeSchema.safeParse(body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten().fieldErrors,
      });
    }

    try {
      const {
        title,
        slug,
        description,
        requirements,
        constraints,
        example,
        startAt,
        endAt,
        maxPoint,
        difficulty,
        allowedLanguages,
        evaluationConfig,
      } = result.data;

      const endDbTimer = challengeDbQueryDurationMs.startTimer({
        operation: "findUnique",
        model: "Challenge",
      });

      const findChallenge = await db.challenge.findUnique({
        where: {
          slug,
        },
      });

      if (findChallenge) {
        endDbTimer({ success: "true" });
        return res.status(401).json({
          message: `Challenge with this title ${title} already exist`,
        });
      }

      const createChallenge = await db.challenge.create({
        data: {
          title: title,
          slug: slug,
          startAt: startAt,
          endAt: endAt,
          description: description,
          requirements: requirements,
          constraints: constraints,
          examples: example!,
          allowedLanguages: allowedLanguages,
          maxPoints: maxPoint,
          contestId: contestId as string,
          difficulty: difficulty,
          evaluationConfig: evaluationConfig!,
        },
      });

      endDbTimer({ success: "true" });

      res.status(201).json({
        message: "challenge has been created",
        Challenge: {
          title: createChallenge.title,
          slug: createChallenge.slug,
          description: createChallenge.slug,
          requirements: createChallenge.slug,
          example: createChallenge.slug,
          constraints: createChallenge.constraints,
          startAt: startAt,
          maxPoint: createChallenge.maxPoints,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);
