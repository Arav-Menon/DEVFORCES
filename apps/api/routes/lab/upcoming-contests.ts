import type { Request, Response } from "express";
import express from "express";
import { db } from "@repo/db/db";

export const upcomingContestsRouter = express.Router();

upcomingContestsRouter.get(
  "/contests/upcoming",
  async (req: Request, res: Response) => {
    const limit = Math.min(parseInt(req.query.limit as string) || 5, 10);

    try {
      const contests = await db.contest.findMany({
        where: {
          status: "UPCOMING",
          startTime: { gte: new Date() },
        },
        include: {
          _count: {
            select: { challenges: true },
          },
        },
        orderBy: { startTime: "asc" },
        take: limit,
      });

      // Get participant counts for each contest
      const contestsWithParticipants = await Promise.all(
        contests.map(async (contest) => {
          const participants = await db.submission.findMany({
            where: {
              challenge: { contestId: contest.id },
            },
            distinct: ["userId"],
            select: { userId: true },
          });

          return {
            id: contest.id,
            title: contest.title,
            slug: contest.slug,
            startTime: contest.startTime,
            challenges: contest._count.challenges,
            participants: participants.length,
          };
        })
      );

      return res.status(200).json({ contests: contestsWithParticipants });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);
