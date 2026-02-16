import {
  submitRequestCounter,
  submitActiveRequests,
  submitHttpDurationMs,
} from "@repo/common/observability";
import type { NextFunction } from "express";

export const submit_request_counter = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  res.on("finish", () => {
    submitRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });
  });
  next();
};

export const submit_active_requests_gauge = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  submitActiveRequests.inc();

  res.on("finish", function () {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);

    submitRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });
    submitActiveRequests.dec();
  });

  next();
};

export const submit_active_request_range = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  submitActiveRequests.inc();

  res.on("finish", function () {
    const endTime = Date.now();
    const duration = endTime - startTime;

    submitRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });

    submitHttpDurationMs.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.path,
        code: res.statusCode,
      },
      duration,
    );

    submitActiveRequests.dec();
  });
  next();
};
