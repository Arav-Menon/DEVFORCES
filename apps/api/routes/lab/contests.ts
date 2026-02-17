import express from "express";
import { middleware } from "../../middleware/auth";
import { db } from "@repo/db/db";
import { contestIdFetchDurationMs } from "@repo/common/observability";

import { contest_metrics_middleware } from "../../middleware/metrics";

export const contestsRouter = express.Router();
contestsRouter.use(contest_metrics_middleware);

contestsRouter.get("/contests", middleware, async (_, res) => {
  try {
    const endTime = contestIdFetchDurationMs.startTimer({
      operation: "findMany",
      model: "Contest",
    });
    const contests = await db.contest.findMany();

    endTime({ success: "true" });

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
