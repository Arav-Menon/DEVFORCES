import express from "express";

export const updateContestRouter = express.Router();

updateContestRouter.get("/update-contest", (_, res) => {
  res.json({
    message: "Perfect",
  });
});
