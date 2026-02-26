import express from "express";
import type { Request, Response } from "express";
import { db } from "@repo/db/db";
import { middleware } from "../../middleware/auth";
import { user_profile_metrics_middleware } from "../../middleware/metrics";
import { userProfileDbQueryDurationMs } from "@repo/common/observability";
import { userDataKey } from "@repo/common/index";
import { client } from "@repo/redis-stream/redis-client";

export const userRoute = express.Router();

userRoute.get(
  "/profile/:userId",
  user_profile_metrics_middleware,
  middleware,
  async (req: Request, res: Response) => {
    const userId = req.id;
    try {
      try {
        const cachedData = await client.get(userDataKey(userId!));
        if (cachedData) {
          return res.status(200).json({
            user: JSON.parse(cachedData),
          });
        }
      } catch (redisError) {
        console.log(`Redis cache GET error ${redisError}`);
      }

      const endDbTimer = userProfileDbQueryDurationMs.startTimer({
        operation: "findUnique",
        model: "User",
      });
      const user = await db.user.findUnique({
        where: { id: userId },
        select: { username: true, email: true },
      });
      endDbTimer({ success: "true" });

      await client.setEx(
        userDataKey(userId as string),
        300,
        JSON.stringify(user),
      );

      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
);
