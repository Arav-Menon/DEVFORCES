import { authRequestCounter } from "@repo/common/observability";
import type { NextFunction } from "express";

export const authMetricsMiddleware = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);
    authRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });
  });
  next();
};
