import { getLeaderBoard } from "@repo/redis-stream/redis-client";
import express from "express";

export const getLeaderBoardRouter = express.Router();

getLeaderBoardRouter.get("/:contestId", async (req, res) => {
  const contestId = req.params.contestId;

  try {
    const leaderboard = await getLeaderBoard(contestId);

    console.table(leaderboard);

    res.status(200).json({
      message: "Top ten leaderboard contestent",
      leaderboard,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
});
