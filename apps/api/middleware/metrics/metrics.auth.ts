import {
  authRequestCounter,
  primaryProcessUsage,
  auth_http_duration_ms,
} from "@repo/common/observability";
import type { NextFunction } from "express";

export const auth_request_counter = (
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
      response_time: endTime - startTime,
    });
  });
  next();
};

export const auth_active_requests_gauge = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  primaryProcessUsage.inc();

  res.on("finish", function () {
    const endTime = Date.now();
    console.log(`Request took ${endTime - startTime}ms`);

    authRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });
    primaryProcessUsage.dec();
  });

  next();
};

export const auth_active_request_range = (req: any, res: any, next: NextFunction) => {
  const startTime = Date.now();
  primaryProcessUsage.inc();

  res.on("finish", function () {
    const endTime = Date.now();
    const duration = endTime - startTime;

    // Increment request counter
    authRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    });

    auth_http_duration_ms.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.path,
        code: res.statusCode,
      },
      duration,
    );

    primaryProcessUsage.dec();
  });
  next();
};
