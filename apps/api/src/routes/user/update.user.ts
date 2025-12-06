import express from "express";

export const updateUserRoute = express.Router();

updateUserRoute.post("/update", (_, res) => {
  res.json({
    message: "hitting to user update route",
  });
});
