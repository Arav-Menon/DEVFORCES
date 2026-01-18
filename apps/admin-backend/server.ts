import express from "express";
import "dotenv/config";
import { AdminAuthrouter } from "./routes/admin-auth/admin.auth";
import { Adminrouter } from "./routes/admin-auth/admin";
export const app = express();

app.use(express.json());

app.use("/api/v1/admin", AdminAuthrouter);
app.use("/api/v1/admin", Adminrouter);

app.listen(process.env.PORT);
