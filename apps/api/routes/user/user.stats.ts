import type { Request, Response } from "express";
import express from "express";
import { middleware } from "../../middleware/auth";
import { db } from "@repo/db/db";

export const userStatsRouter = express.Router();

userStatsRouter.get(
  "/:userId/stats",
  middleware,
  async (req: Request, res: Response) => {
    const userId = req.params.userId as string;

    try {
      const user = await db.user.findUnique({
        where: { id: userId },
        select: { id: true, username: true },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const totalSubmissions = await db.submission.count({
        where: { userId },
      });

      const acceptedSubmissions = await db.submission.count({
        where: { userId, status: "COMPLETED" },
      });

      const uniqueProblemsSolved = await db.submission.groupBy({
        by: ["challengeId"],
        where: { userId, status: "COMPLETED" },
        _count: true,
      });

      const totalChallenges = await db.challenge.count();

      const contestsParticipated = await db.submission.findMany({
        where: { userId },
        distinct: ["challengeId"],
        select: {
          challenge: {
            select: { contestId: true },
          },
        },
      });

      const uniqueContests = new Set(
        contestsParticipated.map((s) => s.challenge.contestId)
      );

      // Calculate streak (simplified: count consecutive days with submissions)
      const recentSubmissions = await db.submission.findMany({
        where: { userId },
        orderBy: { submittedAt: "desc" },
        select: { submittedAt: true },
        take: 100,
      });

      let streak = 0;
      if (recentSubmissions.length > 0) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dates = new Set(
          recentSubmissions.map((s) => {
            const d = new Date(s.submittedAt);
            d.setHours(0, 0, 0, 0);
            return d.getTime();
          })
        );

        let checkDate = today.getTime();
        while (dates.has(checkDate)) {
          streak++;
          checkDate -= 86400000;
        }
      }

      // Simple rating calculation based on problems solved and contests
      const baseRating = 1000;
      const problemBonus = uniqueProblemsSolved.length * 5;
      const contestBonus = uniqueContests.size * 50;
      const rating = baseRating + problemBonus + contestBonus;

      // Calculate rank (simplified: based on rating)
      const rank = Math.max(1, 5000 - rating * 2);

      return res.status(200).json({
        username: user.username,
        rating,
        rank,
        problemsSolved: uniqueProblemsSolved.length,
        totalProblems: totalChallenges,
        totalSubmissions,
        acceptedSubmissions,
        acceptanceRate:
          totalSubmissions > 0
            ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
            : 0,
        streak,
        contestsPlayed: uniqueContests.size,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);
