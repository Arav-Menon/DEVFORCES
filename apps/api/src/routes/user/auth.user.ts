import express from "express";

export const authRoute = express.Router();

authRoute.post("/login", (_, res) => {
  res.json({
    message: "hitting to user auth route",
  });
});
