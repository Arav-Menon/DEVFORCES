import express from "express";
import { db } from "@repo/db/db";
import { middleware } from "../../../middleware/auth";
import { authorizeRole } from "../../../middleware/authorizeRole";
import { client } from "@repo/redis-stream/redis-client";
import { allContestKey } from "@repo/common/index";

export const deleteContestRouter = express.Router();

deleteContestRouter.delete(
  "/:contestId",
  middleware,
  authorizeRole(["ADMIN", "CREATOR"]),
  async (req, res) => {
    const { contestId } = req.params;

    if (!contestId) {
      return res.status(400).json({
        message: "Contest ID is required",
      });
    }

    try {
      const findContest = await db.contest.findUnique({
        where: {
          id: contestId as string,
        },
        include: {
          challenges: true,
        },
      });

      if (!findContest) {
        return res.status(404).json({
          message: "Contest not found",
        });
      }

      await db.$transaction(async (tx) => {
        await tx.challenge.deleteMany({
          where: { contestId: contestId as string },
        });

        await tx.contest.delete({
          where: { id: contestId as string },
        });
      });

      await client.del(allContestKey);

      res.status(200).json({
        message: "Contest deleted successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);
