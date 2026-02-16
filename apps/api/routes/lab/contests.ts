import express from "express";
import { authRoute } from "../user/auth.user";
import { db } from "@repo/db/db";
import { contestIdFetchDurationMs } from "@repo/common/observability";

export const contestsRouter = express.Router();

contestsRouter.get("/contests", authRoute, async (_, res) => {
  try {
    const endTime = contestIdFetchDurationMs.startTimer();
    const contests = await db.contest.findMany();

    endTime();

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
