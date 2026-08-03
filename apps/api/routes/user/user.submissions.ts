import type { Request, Response } from "express";
import express from "express";
import { middleware } from "../../middleware/auth";
import { db } from "@repo/db/db";

export const userSubmissionsRouter = express.Router();

userSubmissionsRouter.get(
  "/:userId/submissions",
  middleware,
  async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 50);

    try {
      const user = await db.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const submissions = await db.submission.findMany({
        where: { userId },
        include: {
          challenge: {
            select: {
              title: true,
              difficulty: true,
              contest: {
                select: { title: true, slug: true },
              },
            },
          },
        },
        orderBy: { submittedAt: "desc" },
        take: limit,
      });

      const formatted = submissions.map((s) => ({
        id: s.id,
        problemTitle: s.challenge.title,
        difficulty: s.challenge.difficulty,
        contestTitle: s.challenge.contest.title,
        contestSlug: s.challenge.contest.slug,
        status: s.status === "COMPLETED" ? "Accepted" : s.status === "PENDING" ? "Pending" : "Processing",
        score: s.score,
        submittedAt: s.submittedAt,
      }));

      return res.status(200).json({ submissions: formatted });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);
