import type { Request, Response } from "express";
import express from "express";
import { middleware } from "../../middleware/auth";
import { authorizeRole } from "../../middleware/authorizeRole";
import { contestSchema } from "@repo/common/validation";
import { db } from "@repo/db/db";
import { contestLimiter } from "@repo/common/rateLimit";

export const contestRouter = express.Router();

contestRouter.post(
  "/create",
  middleware,
  contestLimiter,
  authorizeRole(["ADMIN", "CREATOR"]),
  async (req: Request, res: Response) => {
    const userId = req.id;
    const result = contestSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten().fieldErrors,
      });
    }

    try {
      const { title, slug, startTime } = result.data;

      const findExistingContest = await db.contest.findUnique({
        where: {
          slug,
        },
      });

      if (findExistingContest)
        return res.status(401).json({
          message: `contest with this name ${title} already exist`,
        });

      const createContest = await db.contest.create({
        data: {
          title: title,
          slug: slug,
          startTime: startTime,
          status: "UPCOMING",
          createdById: userId!,
        },
      });

      res.status(201).json({
        message: "contest has been created",
        createContest: {
          id: createContest.id,
          title: createContest.title,
          startAt: createContest.startTime,
        },
      });
    } catch (err) {
      return res.status(500).json({
        message: `Internal server error ${err}`,
      });
    }
  }
);
