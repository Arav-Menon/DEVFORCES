import express, { Router } from "express";
import { userSchema } from "@repo/common/validation";
import { db } from "@repo/db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const authRoute: Router = express.Router();

authRoute.post("/auth", async (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.flatten().fieldErrors,
    });
  }

  const { username, email, password } = result.data;

  const existUser = db.user.findMany({
    where: {
      email,
    },
  });

  const hashPassword = await bcrypt.hash(password, 10);
  if (!existUser) {
    const addUser = await db.user.create({
      data: {
        username,
        passowrd: hashPassword,
        email,
        role: "USER",
      },
    });

    const token = jwt.sign(
      {
        id: addUser.id,
      },
      process.env.AUTH_SECRET_KEY!
    );

    res.sendStatus(200).json({
      token,
      user: {
        username,
        email,
      },
    });
  }
});
