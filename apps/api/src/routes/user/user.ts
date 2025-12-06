import express from "express";

export const userRoute = express.Router();

userRoute.get("/auth", (_, res) => {
  res.json({
    message: "hitting to user auth route",
  });
});
