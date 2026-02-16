import {
  contestRequestCounter,
  contestActiveRequests,
  contestHttpDurationMs,
} from "@repo/common/observability";
import type { NextFunction } from "express";

export const contest_request_counter = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  res.on("finish", () => {
    contestRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });
  });
  next();
};

export const contest_active_requests_gauge = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  contestActiveRequests.inc();

  res.on("finish", function () {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);

    contestRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });
    contestActiveRequests.dec();
  });

  next();
};

export const contest_active_request_range = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  contestActiveRequests.inc();

  res.on("finish", function () {
    const endTime = Date.now();
    const duration = endTime - startTime;

    contestRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });

    contestHttpDurationMs.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.path,
        code: res.statusCode,
      },
      duration,
    );

    contestActiveRequests.dec();
  });
  next();
};
