import {
  challengeRequestCounter,
  challengeActiveRequests,
  challengeHttpDurationMs,
} from "@repo/common/observability";
import type { NextFunction } from "express";

export const challege_request_counter = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  res.on("finish", () => {
    challengeRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });
  });
  next();
};

export const challege_active_requests_gauge = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  challengeActiveRequests.inc();

  res.on("finish", function () {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);

    challengeRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });
    challengeActiveRequests.dec();
  });

  next();
};

export const challege_active_request_range = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  challengeActiveRequests.inc();

  res.on("finish", function () {
    const endTime = Date.now();
    const duration = endTime - startTime;

    challengeRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });

    challengeHttpDurationMs.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.path,
        code: res.statusCode,
      },
      duration,
    );

    challengeActiveRequests.dec();
  });
  next();
};
