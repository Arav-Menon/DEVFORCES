import {
  getLeaderBoard,
  createLeaderboardSubscriber,
} from "@repo/redis-stream/redis-client";
import express, { type Request, type Response } from "express";

export const getLeaderBoardRouter = express.Router();

getLeaderBoardRouter.get("/:contestId", async (req, res) => {
  const contestId = req.params.contestId;

  try {
    const leaderboard = await getLeaderBoard(contestId);

    console.table(leaderboard);

    res.status(200).json({
      message: "Top ten leaderboard contestent",
      leaderboard,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err,
    });
  }
});

getLeaderBoardRouter.get("/:contestId/stream", async (req: Request, res: Response) => {
  const contestId = req.params.contestId;

  if (!contestId) {
    res.status(400).json({ error: "Contest ID is required" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.flushHeaders();

  console.log(`SSE client connected for contest ${contestId}`);

  try {
    const initialLeaderboard = await getLeaderBoard(contestId);
    res.write(`data: ${JSON.stringify({
      type: "initial",
      contestId,
      leaderboard: initialLeaderboard,
      timestamp: Date.now(),
    })}\n\n`);
  } catch (err) {
    console.error("Failed to send initial leaderboard:", err);
    res.write(`data: ${JSON.stringify({
      type: "error",
      message: "Failed to fetch initial leaderboard",
    })}\n\n`);
  }

  let subscriber: any = null;
  let heartbeatInterval: NodeJS.Timeout | null = null;

  try {
    subscriber = await createLeaderboardSubscriber();
    const channel = `leaderboard:updates:${contestId}`;

    await subscriber.subscribe(channel, (message: string) => {
      try {
        const data = JSON.parse(message);
        res.write(`data: ${JSON.stringify({
          type: "update",
          ...data,
        })}\n\n`);
      } catch (err) {
        console.error("Failed to parse or send leaderboard update:", err);
      }
    });

    console.log(`Subscribed to ${channel}`);

    heartbeatInterval = setInterval(() => {
      res.write(`:heartbeat ${Date.now()}\n\n`);
    }, 30000);

  } catch (err) {
    console.error("Failed to setup Redis subscription:", err);
    res.write(`data: ${JSON.stringify({
      type: "error",
      message: "Failed to setup real-time updates",
    })}\n\n`);
  }

  req.on("close", async () => {
    console.log(`SSE client disconnected for contest ${contestId}`);
    
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
    }

    if (subscriber) {
      try {
        await subscriber.unsubscribe(`leaderboard:updates:${contestId}`);
        await subscriber.quit();
        console.log(`Cleaned up subscription for contest ${contestId}`);
      } catch (err) {
        console.error("Error during cleanup:", err);
      }
    }

    res.end();
  });
});
