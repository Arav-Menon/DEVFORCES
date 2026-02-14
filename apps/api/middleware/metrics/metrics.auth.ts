import {
  authRequestCounter,
  primaryProcessUsage,
  auth_http_duration_ms,
  contestRequestCounter,
  contestActiveRequests,
  contestHttpDurationMs,
  challengeRequestCounter,
  challengeActiveRequests,
  challengeHttpDurationMs,
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

export const auth_active_request_range = (
  req: any,
  res: any,
  next: NextFunction,
) => {
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

export const counter_active_request_range = (
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
