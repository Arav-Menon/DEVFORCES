import express from "express";
import { db } from "@repo/db/db";
import { middleware } from "../../../middleware/auth";
import { authorizeRole } from "../../../middleware/authorizeRole";
import { contestSchema } from "@repo/common/validation";
import { client } from "@repo/redis-stream/redis-client";
import { allContestKey } from "@repo/common/index";

export const updateContestRouter = express.Router();

updateContestRouter.patch(
  "/:contestId",
  middleware,
  authorizeRole(["ADMIN", "CREATOR"]),
  async (req: any, res) => {
    const { contestId } = req.params;
    const userId = req.user?.id;
    const role = req.user?.role;

    const result = contestSchema.partial().safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten().fieldErrors,
      });
    }

    try {
      const contest = await db.contest.findUnique({
        where: { id: contestId },
      });

      if (!contest) {
        return res.status(404).json({
          message: "Contest not found",
        });
      }

      if (role === "CREATOR" && contest.createdById !== userId) {
        return res.status(403).json({
          message: "You can only update contests you created",
        });
      }

      const updatedContest = await db.contest.update({
        where: { id: contestId },
        data: result.data,
      });

      await client.del(allContestKey);

      res.status(200).json({
        message: "Contest updated successfully",
        contest: updatedContest,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  },
);
