import express from "express";

export const deleteChallengeRouter = express.Router();

deleteChallengeRouter.get("/delete-challenge", (_, res) => {
    res.json({
        message : "perfect"
    })
})