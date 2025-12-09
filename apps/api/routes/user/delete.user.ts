import express from "express";

export const deleteUserRoute = express.Router();

deleteUserRoute.delete("/delete", (_, res) => {
    res.json({
        message : "hitting to user delete route"
    })
})
