import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, "process.env.JWT_ROOM_TOKEN");

    console.log(decoded);

    //@ts-ignore
    req.id = decoded.id;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(403).json({ message: "Invalid token" });
  }
}
