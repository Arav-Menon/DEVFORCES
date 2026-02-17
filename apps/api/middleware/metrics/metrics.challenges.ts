import {
  challengeRequestCounter,
  challengeActiveRequests,
  challengeHttpDurationMs,
} from "@repo/common/observability";
import type { NextFunction } from "express";

export const challenge_metrics_middleware = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  challengeActiveRequests.inc();

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    const labels = {
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    };

    challengeRequestCounter.inc(labels);
    challengeHttpDurationMs.observe(labels, duration);
    challengeActiveRequests.dec();
  });

  next();
};
