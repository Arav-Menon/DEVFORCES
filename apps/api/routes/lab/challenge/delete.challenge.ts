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

    if (!contestId || !challengeId) {
      return res.status(400).json({
        message: "Contest ID and Challenge ID are required",
      });
    }

    try {
      const findChallenge = await db.challenge.findFirst({
        where: {
          id: challengeId as string,
          contestId: contestId as string,
        },
      });

      if (!findChallenge) {
        return res.status(404).json({
          message: "Challenge not found",
        });
      }

      await db.challenge.delete({
        where: { id: challengeId as string },
      });

      res.status(200).json({
        message: "Challenge deleted successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);
