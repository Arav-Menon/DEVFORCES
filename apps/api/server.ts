import express from "express";
import "dotenv/config";
import { authRoute } from "./routes/user/auth.user";
import { deleteUserRoute } from "./routes/user/delete.user";
import { updateUserRoute } from "./routes/user/update.user";
import { userRoute } from "./routes/user/user";
import { contestRouter } from "./routes/contest/contests";
import { updateContestRouter } from "./routes/contest/update.contests";
import { deleteContestRouter } from "./routes/contest/delete.contest";
import { challengeRouter } from "./routes/challenge/challenge";
import { deleteChallengeRouter } from "./routes/challenge/delete.challenge";
import { updateChallengeRouter } from "./routes/challenge/update.challenge";

const app = express();
app.use(express.json());

app.use("/api/v1/user/", authRoute);
app.use("/api/v1/user/", userRoute);
app.use("/api/v1/user/", updateUserRoute);
app.use("/api/v1/user/", deleteUserRoute);

app.use("/api/v1/contest/", contestRouter);
app.use("/api/v1/contest/", updateContestRouter);
app.use("/api/v1/contest/", deleteContestRouter);

app.use("/api/v1/contest/", challengeRouter);
app.use("/api/v1/contest/", updateChallengeRouter);
app.use("/api/v1/contest/", deleteChallengeRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT ${process.env.PORT}`);
});
