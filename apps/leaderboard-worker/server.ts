import { getLeaderBoard } from "@repo/redis-stream/redis-client";
import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json());

app.use("/api/v1/leaderboard", getLeaderBoard);

app.listen(process.env.PORT, () => {
  console.log(`leaderboard sever is started at ${process.env.PORT}`);
});
