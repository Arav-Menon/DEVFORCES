import express from "express";
import { db } from "@repo/db/db";
import { middleware } from "../../middleware/auth.middleware";
import { updateUserRoleSchema } from "@repo/common/validation";
import "dotenv/config";

export const AdminUsersRouter = express();

AdminUsersRouter.patch("/role", middleware, async (req: any, res: any) => {
  try {
    const adminId = req.user.id;

    const admin = await db.user.findUnique({
      where: { id: adminId },
      select: { role: true },
    });

    if (!admin || admin.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const result = updateUserRoleSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten().fieldErrors,
      });
    }

    const { userId, role } = result.data;

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.role === "ADMIN") {
      return res
        .status(400)
        .json({ error: "Cannot modify admin user roles" });
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    res.json({
      message: "User role updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Role update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});