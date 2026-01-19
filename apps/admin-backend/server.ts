import express from "express";
import "dotenv/config";
import { AdminAuthrouter } from "./routes/admin-auth/admin.auth";
import { Adminrouter } from "./routes/admin-auth/admin";
import { AdminUsersRoleRouter } from "./routes/controllers/admin-controllers/admin.updateRole";
import { AdminUsersBlockRouter } from "./routes/controllers/admin-controllers/admin.users.block";
import { AdminUsersRouter } from "./routes/controllers/admin-controllers/admin.users";
import { AdminUsersUnblockRouter } from "./routes/controllers/admin-controllers/admin.users.unblock";
export const app = express();

app.use(express.json());

app.use("/api/v1/admin/", AdminAuthrouter);
app.use("/api/v1/admin/", Adminrouter);

app.use("/api/v1/admin/", AdminUsersBlockRouter);
app.use("/api/v1/admin/", AdminUsersUnblockRouter);

app.use("/api/v1/admin/", AdminUsersRoleRouter);

app.use("/api/v1/admin/", AdminUsersRouter);

app.listen(process.env.PORT);
