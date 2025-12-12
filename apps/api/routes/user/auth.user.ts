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

  try {
    const { username, email, password } = result.data;

    const existUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existUser) {
      const comparePassword = await bcrypt.compare(
        password,
        existUser.password
      );

      if (!comparePassword)
        return res.status(401).json({
          message: "Wrong password",
        });

      const token = jwt.sign(
        {
          id: existUser.id,
        },
        process.env.AUTH_TOKEN!
      );

      res.status(200).json({
        token,
        user: {
          username,
          email,
        },
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const addUser = await db.user.create({
      data: {
        username: username ?? "",
        password: hashPassword,
        email,
        role: "USER",
      },
    });

    const token = jwt.sign(
      {
        id: addUser.id,
      },
      "ssdsddsfsd"
    );

    res.status(200).json({
      token,
      user: {
        username,
        email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Internal sever error ${err}`,
    });
  }
});
