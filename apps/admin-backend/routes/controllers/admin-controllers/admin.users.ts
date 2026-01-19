import express from "express";
import { db } from "@repo/db/db";
import { middleware } from "../../middleware/auth.middleware";
import { authorizeRole } from "../../middleware/authorizeRole";
import "dotenv/config";
import { adminUserSchema } from "@repo/common/validation";

export const AdminUsersRouter = express();

AdminUsersRouter.get(
  "/search/users",
  middleware,
  authorizeRole(["ADMIN"]),
  async (req, res) => {
    const result = adminUserSchema.safeParse(req.query);

    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten().fieldErrors,
      });
    }
    const username = result.data.username;

    if (!username) return res.status(400).json("username required");

    const findUser = await db.user.findUnique({
      where: { username },
    });

    if (!findUser) return res.status(404).json("user not found");

    res.json({
      user: {
        id: findUser.id,
        username: findUser.username,
        email: findUser.email,
        role: findUser.role,
      },
    });
  },
);
