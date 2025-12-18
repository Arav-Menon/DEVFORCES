import express from "express";
import { challengeSchema } from "@repo/common/validation";
import { db } from "@repo/db/db";
import { middleware } from "../../middleware/auth";
import { authorizeRole } from "../../middleware/authorizeRole";

export const challengeRouter = express.Router();

challengeRouter.post(
  "/:contestId/challenge",
  middleware,
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
        maxPoint,
      } = result.data;

      const findChallenge = await db.challenge.findUnique({
        where: {
          title,
        },
      });

      if (findChallenge) {
        return res.status(401).json({
          message: `Challenge with this title ${title} already exist`,
        });
      }

      const createChallenge = await db.challenge.create({
        data: {
          title: title,
          slug: slug,
          startAt: startAt,
          description: description,
          requirements: requirements,
          constraints: constraints,
          examples: example,
          maxPoints: maxPoint,
          contestId: contestId,
        },
      });

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
  }
);
