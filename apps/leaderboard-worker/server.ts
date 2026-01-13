import { getLeaderBoard } from "@repo/redis-stream/redis-client";
import express from "express";
import "dotenv/config";

export const app = express();

app.use(express.json());

app.use("/api/v1/leaderboard", getLeaderBoard);
