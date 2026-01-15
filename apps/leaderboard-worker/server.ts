import express from "express";
import "dotenv/config";
import { getLeaderBoardRouter } from "./routes/getLeaderboard";

export const app = express();

app.use(express.json());

app.use("/api/v1/leaderboard", getLeaderBoardRouter);
