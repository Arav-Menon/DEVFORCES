import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { db } from "@repo/db/db";
import { adminAuthSchema } from "@repo/common/validation";
import "dotenv/config";

export const AdminAuthrouter = express();

AdminAuthrouter.post("/login", async (req: any, res: any) => {
  const result = adminAuthSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.flatten().fieldErrors,
    });
  }

  try {
    const { username, password } = result.data;

    const admin = await db.user.findUnique({
      where: { username },
    });

    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (admin.role !== "ADMIN") {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "4h",
      },
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});