import {
  submitRequestCounter,
  submitActiveRequests,
  submitHttpDurationMs,
} from "@repo/common/observability";
import type { NextFunction } from "express";

export const submit_metrics_middleware = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  submitActiveRequests.inc();

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    const labels = {
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    };

    submitRequestCounter.inc(labels);
    submitHttpDurationMs.observe(labels, duration);
    submitActiveRequests.dec();
  });

  next();
};
