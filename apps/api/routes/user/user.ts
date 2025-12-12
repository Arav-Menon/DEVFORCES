import express from "express";
import type { Request, Response } from "express";
import { db } from "@repo/db/db";
import { auth } from "../middleware/auth";

export const userRoute = express.Router();

userRoute.get("/profile/:userId", auth, async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { username: true, email: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error });
  }
});
