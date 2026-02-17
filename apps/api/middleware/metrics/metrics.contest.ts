import {
  contestRequestCounter,
  contestActiveRequests,
  contestHttpDurationMs,
} from "@repo/common/observability";
import type { NextFunction } from "express";

export const contest_metrics_middleware = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  contestActiveRequests.inc();

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    const labels = {
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    };

    contestRequestCounter.inc(labels);
    contestHttpDurationMs.observe(labels, duration);
    contestActiveRequests.dec();
  });

  next();
};
