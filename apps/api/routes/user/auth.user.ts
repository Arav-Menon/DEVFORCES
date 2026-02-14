import express, { Router } from "express";
import { userSchema } from "@repo/common/validation";
import { authLimiter } from "@repo/common/rateLimit";
import { db } from "@repo/db/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  auth_request_counter,
  auth_active_requests_gauge,
  auth_active_request_range,
} from "../../middleware/metrics";
import { auth_db_query_duration_ms } from "@repo/common/observability";

export const authRoute: Router = express.Router();

authRoute.use(
  auth_request_counter,
  auth_active_requests_gauge,
  auth_active_request_range,
);

authRoute.post("/auth", authLimiter, async (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.flatten().fieldErrors,
    });
  }

  try {
    const { username, email, password } = result.data;

    const existUser = await db.user.findUnique({
      where: { email },
    });

    if (existUser) {
      const endDbTimer = auth_db_query_duration_ms.startTimer();

      const comparePassword = await bcrypt.compare(
        password,
        existUser.password,
      );

      endDbTimer();

      if (!comparePassword)
        return res.status(401).json({
          message: "Wrong password",
        });

      if (existUser.isBlocked === true) {
        res.status(403).json(`${existUser.username} is blocked`);
      }

      const token = jwt.sign(
        {
          id: existUser.id,
          role: existUser.role,
        },
        process.env.AUTH_TOKEN!,
        { expiresIn: "7d" },
      );

      return res.status(200).json({
        token,
        user: {
          username,
          email,
        },
      });
    }

    if (!username) {
      res.status(400).json({
        message: "Username is required for signup",
      });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const endDbTimer = auth_db_query_duration_ms.startTimer();

    const addUser = await db.user.create({
      data: {
        username: username ?? "",
        password: hashPassword,
        email,
        role: "USER",
      },
    });

    endDbTimer();

    const token = jwt.sign(
      {
        id: addUser.id,
        role: addUser.role,
      },
      process.env.AUTH_TOKEN!,
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
      message: `Internal sever error ${err} `,
    });
  }
});
