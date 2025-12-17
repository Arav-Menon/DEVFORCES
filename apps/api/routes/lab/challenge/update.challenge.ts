import express from "express";

export const updateChallengeRouter = express.Router();

updateChallengeRouter.get("/challenge", (_, res) => {
  res.json({
    message: "perfect",
  });
});
