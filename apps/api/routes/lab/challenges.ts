import express from "express";
import { middleware } from "../../middleware/auth";
import { db } from "@repo/db/db";
import { challengeIdFetchDurationMs } from "@repo/common/observability";

import { challenge_metrics_middleware } from "../../middleware/metrics";

export const challengesRouter = express.Router();
challengesRouter.use(challenge_metrics_middleware);

challengesRouter.get("/:contestId/challenges", middleware, async (req, res) => {
  const contestId = req.params.contestId;
  try {
    const endTime = challengeIdFetchDurationMs.startTimer({
      operation: "findUnique",
      model: "Contest",
    });
    const findContest = await db.contest.findUnique({
      where: {
        id: contestId,
      },
    });

    if (!findContest) {
      endTime({ success: "false" });
      return res.status(404).json({
        message: `contest not found`,
      });
    }

    const challenges = await db.challenge.findMany({
      where: {
        contestId,
      },
    });

    if (challenges.length == 0) {
      endTime({ success: "true" });
      return res.status(404).json({
        message: `Challenges in this contest ${findContest.title} not found`,
      });
    }

    endTime({ success: "true" });

    res.status(200).json({
      challenges,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
