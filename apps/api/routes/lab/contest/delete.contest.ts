import express from "express";
import { db } from "@repo/db/db";
import { middleware } from "../../../middleware/auth";
import { authorizeRole } from "../../../middleware/authorizeRole";
import { client } from "@repo/redis-stream/redis-client";
import { allContestKey } from "@repo/common/index";

export const deleteContestRouter = express.Router();

deleteContestRouter.delete(
  "/:contestId/challenge/:challengeId",
  middleware,
  authorizeRole(["ADMIN", "CREATOR"]),
  async (req, res) => {
    const { contestId, challengeId } = req.params;

    if (!contestId || !challengeId) return;

    try {
      const findContest = await db.contest.findUnique({
        where: {
          id: contestId,
        },
      });

      const findChallenge = await db.challenge.findUnique({
        where: { id: challengeId },
      });

      if (!findContest || !findChallenge) {
        res.status(404).json({
          message: "contest or challenge not found",
        });
      }

      const removeChallengeContest = await db.$transaction(
        async (tx: {
          challenge: {
            delete: (arg0: {
              where: { id: string | string[] };
              select: { id: string | string[] };
            }) => any;
          };
          contest: {
            delete: (arg0: { while: { id: string | string[] } }) => any;
          };
        }) => {
          await tx.challenge.delete({
            where: { id: challengeId },
            select: {
              id: contestId,
            },
          });

          await tx.contest.delete({
            while: { id: contestId },
          });
        },
      );

      await client.del(allContestKey);

      res.status(204).json({
        removeChallengeContest,
        message: `contest deleted succesfully `,
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        err: err,
      });
    }
  },
);
