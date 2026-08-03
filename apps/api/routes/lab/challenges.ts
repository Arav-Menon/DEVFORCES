import express from "express";
import { middleware } from "../../middleware/auth";
import { db } from "@repo/db/db";
import { challengeIdFetchDurationMs } from "@repo/common/observability";
import { contestChallengeKey } from "@repo/common/index";
import { challenge_metrics_middleware } from "../../middleware/metrics";
import { client } from "@repo/redis-stream/redis-client";

export const challengesRouter = express.Router();
challengesRouter.use(challenge_metrics_middleware);

challengesRouter.get("/:contestId/challenges", middleware, async (req, res) => {
  const contestId = req.params.contestId;
  try {
    try {
      const cacheData = await client.get(contestChallengeKey(contestId));
      if (cacheData) {
        const parsed = JSON.parse(cacheData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return res.status(200).json({
            challenges: parsed,
          });
        }
      }
    } catch (redisError) {
      console.error(`Redis cache GET error  ${redisError}`);
    }

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

    try {
      await client.setEx(contestChallengeKey(contestId), 300, JSON.stringify(challenges));
    } catch (redisError) {
      console.error(`Redis cache SET error ${redisError}`);
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
