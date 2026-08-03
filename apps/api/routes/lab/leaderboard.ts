import type { Request, Response } from "express";
import express from "express";
import { db } from "@repo/db/db";

export const leaderboardRouter = express.Router();

leaderboardRouter.get(
  "/leaderboard",
  async (req: Request, res: Response) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 50);

    try {
      // Get all users with their submission stats
      const users = await db.user.findMany({
        select: {
          id: true,
          username: true,
          submission: {
            select: {
              status: true,
              challenge: {
                select: { difficulty: true },
              },
            },
          },
        },
      });

      // Calculate rating for each user
      const leaderboard = users
        .map((user) => {
          let rating = 1000;
          const problemsSolved = new Set<string>();

          for (const sub of user.submission) {
            if (sub.status === "COMPLETED") {
              problemsSolved.add(sub.challenge.difficulty);
              if (sub.challenge.difficulty === "HARD") rating += 15;
              else if (sub.challenge.difficulty === "MEDIUM") rating += 10;
              else rating += 5;
            }
          }

          return {
            username: user.username,
            rating,
            problemsSolved: problemsSolved.size,
          };
        })
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit)
        .map((user, index) => ({
          rank: index + 1,
          username: user.username,
          rating: user.rating,
        }));

      return res.status(200).json({ leaderboard });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);
