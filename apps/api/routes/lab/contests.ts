import express from "express";
import { middleware } from "../../middleware/auth";
import { db } from "@repo/db/db";
import { contestIdFetchDurationMs } from "@repo/common/observability";
import { client } from "@repo/redis-stream/redis-client";
import { allContestKey } from "@repo/common/index";
import { contest_metrics_middleware } from "../../middleware/metrics";

export const contestsRouter = express.Router();
contestsRouter.use(contest_metrics_middleware);

contestsRouter.get("/contests", middleware, async (_, res) => {
  try {
    try {
      const cachedData = await client.get(allContestKey);
      if (cachedData) {
        return res.status(200).json({
          contests: JSON.parse(cachedData),
        });
      }
    } catch (redisError) {
      console.error("Redis cache GET error:", redisError);
    }

    const endTime = contestIdFetchDurationMs.startTimer({
      operation: "findMany",
      model: "Contest",
    });
    const contests = await db.contest.findMany();

    endTime({ success: "true" });

    try {
      await client.setEx(allContestKey, 300, JSON.stringify(contests));
    } catch (redisError) {
      console.error("Redis cache SET error:", redisError);
    }

    return res.status(200).json({
      contests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch contests",
    });
  }
});
