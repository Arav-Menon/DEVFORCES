import express from "express";
import type { Request, Response } from "express";
import { db } from "@repo/db/db";
import { middleware } from "../../middleware/auth";
import { user_profile_fetch_duration } from "../../middleware/metrics";
import { userProfileDbQueryDurationMs } from "@repo/common/observability";

export const userRoute = express.Router();

userRoute.get(
  "/profile/:userId",
  user_profile_fetch_duration,
  middleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.id;
      const endDbTimer = userProfileDbQueryDurationMs.startTimer();
      const user = await db.user.findUnique({
        where: { id: userId },
        select: { username: true, email: true },
      });
      endDbTimer({ operation: "findUnique", model: "User", success: "true" });

      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
);
