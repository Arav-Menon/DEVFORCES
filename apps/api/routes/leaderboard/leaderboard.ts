import express from "express";
import { middleware } from "../middleware/auth";

export const leaderboardRouter = express();

leaderboardRouter.post("/:contestId", middleware, (req, res) => {
  const userId = req.id;
  const contestId = req.params;
});
