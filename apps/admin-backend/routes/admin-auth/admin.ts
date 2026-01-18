import express from "express";
import { db } from "@repo/db/db";
import { middleware } from "../middleware/auth.middleware";
import "dotenv/config";

export const Adminrouter = express();

Adminrouter.get("/profile", middleware, async (req: any, res: any) => {
  try {
    const userId = req.user.id;

    const admin = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    if (admin.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    res.json({
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
