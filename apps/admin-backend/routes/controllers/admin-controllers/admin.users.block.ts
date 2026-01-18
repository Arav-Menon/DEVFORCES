import express from "express";
import { db } from "@repo/db/db";
import { middleware } from "../../middleware/auth.middleware";
import { blockUserSchema } from "@repo/common/validation";
import "dotenv/config";

export const AdminUsersBlockRouter = express();

AdminUsersBlockRouter.patch("/block", middleware, async (req: any, res: any) => {
  try {
    const adminId = req.user.id;

    const admin = await db.user.findUnique({
      where: { id: adminId },
      select: { role: true },
    });

    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const result = blockUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten().fieldErrors,
      });
    }

    const { userId } = result.data;

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "ADMIN") {
      return res.status(400).json({ error: "Cannot block admin users" });
    }

    if (user.isBlocked) {
      return res.status(400).json({ error: "User is already blocked" });
    }

    const blockedUser = await db.user.update({
      where: { id: userId },
      data: {
        isBlocked: true,
        blockedAt: new Date(),
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isBlocked: true,
        blockedAt: true,
      },
    });

    res.json({
      message: "User blocked successfully",
      user: blockedUser,
    });
  } catch (error) {
    console.error("Block user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

AdminUsersBlockRouter.patch("/unblock", middleware, async (req: any, res: any) => {
  try {
    const adminId = req.user.id;

    const admin = await db.user.findUnique({
      where: { id: adminId },
      select: { role: true },
    });

    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const result = blockUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten().fieldErrors,
      });
    }

    const { userId } = result.data;

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isBlocked) {
      return res.status(400).json({ error: "User is not blocked" });
    }

    const unblockedUser = await db.user.update({
      where: { id: userId },
      data: {
        isBlocked: false,
        blockedAt: null,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isBlocked: true,
        blockedAt: true,
      },
    });

    res.json({
      message: "User unblocked successfully",
      user: unblockedUser,
    });
  } catch (error) {
    console.error("Unblock user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
