import express from "express";

export const deleteContestRouter = express.Router();

deleteContestRouter.get("/delete-contest",(_, res) => {
    res.json({
        message : "Perfect"
    })
})