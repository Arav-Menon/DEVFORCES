import express from "express";
import "dotenv/config";
import cors from "cors";
import { authRoute } from "./routes/user/auth.user";
import { deleteUserRoute } from "./routes/user/delete.user";
import { updateUserRoute } from "./routes/user/update.user";
import { userRoute } from "./routes/user/user";
import { contestRouter } from "./routes/lab/contest/contest";
import { updateContestRouter } from "./routes/lab/contest/update.contests";
import { deleteContestRouter } from "./routes/lab/contest/delete.contest";
import { challengeRouter } from "./routes/lab/challenge/challenge";
import { deleteChallengeRouter } from "./routes/lab/challenge/delete.challenge";
import { contestsRouter } from "./routes/lab/contests";
import { challengesRouter } from "./routes/lab/challenges";
import { submitRouter } from "./routes/lab/submit-challenge/submit";
import { leaderboardRouter } from "./routes/lab/leaderboard";
import { upcomingContestsRouter } from "./routes/lab/upcoming-contests";
import { userStatsRouter } from "./routes/user/user.stats";
import { userSubmissionsRouter } from "./routes/user/user.submissions";
import { userRatingHistoryRouter } from "./routes/user/user.rating-history";
import { serveMetrics } from "@repo/common/observability";

export const app = express();
app.use(express.json());



app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api/v1/user/", authRoute);
app.use("/api/v1/user/", userRoute);
app.use("/api/v1/user/", userStatsRouter);
app.use("/api/v1/user/", userSubmissionsRouter);
app.use("/api/v1/user/", userRatingHistoryRouter);
app.use("/api/v1/user/", updateUserRoute);
app.use("/api/v1/user/", deleteUserRoute);

app.use("/api/v1/contest/", contestRouter);
app.use("/api/v1/contest/", updateContestRouter);
app.use("/api/v1/contest/", deleteContestRouter);

app.use("/api/v1/contest/", challengeRouter);
app.use("/api/v1/contest/", deleteChallengeRouter);

app.use("/api/v1/", contestsRouter);
app.use("/api/v1/", leaderboardRouter);
app.use("/api/v1/", upcomingContestsRouter);
app.use("/api/v1/contest/", challengesRouter);

app.use("/api/v1/challenge/", submitRouter);

app.get("/metrics", async (req: any, res: any) => {
  await serveMetrics(res);
});

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});
