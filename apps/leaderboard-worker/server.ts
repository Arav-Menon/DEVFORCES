import express from "express";
import "dotenv/config";
import { getLeaderBoardRouter } from "./routes/getLeaderboard";

export const app = express();

// CORS middleware for SSE support
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.use("/api/v1/leaderboard", getLeaderBoardRouter);
