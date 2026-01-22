import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const middleware = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.AUTH_TOKEN!) as any;

   req.user = {
      id: decoded.id,
    } as any

  next();
};
