import express from "express";
import { db } from "@repo/db/db";
import { middleware } from "../../../middleware/auth";
import { authorizeRole } from "../../../middleware/authorizeRole";

export const deleteChallengeRouter = express.Router();

deleteChallengeRouter.delete(
  "/:contestId/challenge/:challengeId",
  middleware,
  authorizeRole(["ADMIN", "CREATOR"]),
  async (req, res) => {
    const { contestId, challengeId } = req.params;

    if (!contestId || !challengeId) return;

    try {
      const findContest = await db.contest.findUnique({
        where: {
          id: contestId as string,
        },
      });

      const findChallenge = await db.challenge.findUnique({
        where: { id: challengeId as string },
      });

      if (!findContest || !findChallenge) {
        res.status(404).json({
          message: "contest or challenge not found",
        });
      }

      const removeChallenge = await db.challenge.delete({
        where: { id: challengeId as string },
      });

      res.status(204).json({
        challenge: removeChallenge.title,
        message: `challenge deleted succesfully `,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        err: err,
      });
    }
  },
);
