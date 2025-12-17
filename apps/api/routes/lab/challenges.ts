import express from "express";
import { authRoute } from "../user/auth.user";
import { db } from "@repo/db/db";

export const challengesRouter = express.Router();

challengesRouter.get("/:contestId/challenges", authRoute, async (req, res) => {
  const contestId = req.params.contestId;
  try {
    const findContest = await db.contest.findUnique({
      where: {
        id: contestId,
      },
    });

    if (!findContest)
      return res.status(404).json({
        message: `contest not found`,
      });

    const challenges = await db.challenge.findMany({
      where: {
        contestId,
      },
    });

    if (challenges.length == 0)
      return res.status(404).json({
        message: `Challenges in this contest ${findContest.title} not found`,
      });

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
