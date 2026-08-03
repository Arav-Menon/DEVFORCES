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

challengeRouter.get(
  "/:contestId/challenge/:challengeId",
  async (req, res) => {
    const { contestId, challengeId } = req.params;

    try {
      const challenge = await db.challenge.findFirst({
        where: {
          id: challengeId,
          contestId: contestId,
        },
      });

      if (!challenge) {
        return res.status(404).json({
          message: "Challenge not found",
        });
      }

      res.status(200).json({
        challenge,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);

challengeRouter.patch(
  "/:contestId/challenge/:challengeId",
  middleware,
  challengeLimiter,
  authorizeRole(["ADMIN", "CREATOR"]),
  async (req, res) => {
    const { contestId, challengeId } = req.params;
    const result = challengeSchema.partial().safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten().fieldErrors,
      });
    }

    try {
      const existingChallenge = await db.challenge.findFirst({
        where: {
          id: challengeId as string,
          contestId: contestId as string,
        },
      });

      if (!existingChallenge) {
        return res.status(404).json({
          message: "Challenge not found",
        });
      }

      const updateData: any = {};
      if (result.data.title) updateData.title = result.data.title;
      if (result.data.slug) updateData.slug = result.data.slug;
      if (result.data.description) updateData.description = result.data.description;
      if (result.data.requirements) updateData.requirements = result.data.requirements;
      if (result.data.constraints) updateData.constraints = result.data.constraints;
      if (result.data.example) updateData.examples = result.data.example;
      if (result.data.allowedLanguages) updateData.allowedLanguages = result.data.allowedLanguages;
      if (result.data.maxPoint) updateData.maxPoints = result.data.maxPoint;
      if (result.data.startAt) updateData.startAt = result.data.startAt;
      if (result.data.endAt) updateData.endAt = result.data.endAt;
      if (result.data.difficulty) updateData.difficulty = result.data.difficulty;
      if (result.data.evaluationConfig) updateData.evaluationConfig = result.data.evaluationConfig;

      const updatedChallenge = await db.challenge.update({
        where: { id: challengeId as string },
        data: updateData,
      });

      res.status(200).json({
        message: "Challenge updated successfully",
        challenge: updatedChallenge,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);

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
        challenge: {
          id: createChallenge.id,
          title: createChallenge.title,
          slug: createChallenge.slug,
          description: createChallenge.description,
          requirements: createChallenge.requirements,
          examples: createChallenge.examples,
          constraints: createChallenge.constraints,
          startAt: createChallenge.startAt,
          endAt: createChallenge.endAt,
          maxPoints: createChallenge.maxPoints,
          difficulty: createChallenge.difficulty,
          allowedLanguages: createChallenge.allowedLanguages,
          evaluationConfig: createChallenge.evaluationConfig,
          contestId: createChallenge.contestId,
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
