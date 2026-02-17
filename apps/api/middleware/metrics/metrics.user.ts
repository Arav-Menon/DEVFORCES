import {
  authRequestCounter,
  primaryProcessUsage,
  userProfileRequestCounter,
  userProfileHttpDurationMs,
  authHttpDurationMs,
  register,
} from "@repo/common/observability";
import type { NextFunction } from "express";

export const auth_metrics_middleware = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  primaryProcessUsage.inc();
  console.log(`[Metrics] Auth request started: ${req.method} ${req.path}`);

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    const labels = {
      method: String(req.method),
      route: String(req.route ? req.route.path : req.path),
      statusCode: String(res.statusCode),
    };

    console.log(
      `[Metrics] Auth request finished: ${labels.method} ${labels.route} ${labels.statusCode}, duration: ${duration}ms`,
    );

    authRequestCounter.inc(labels);
    authHttpDurationMs.observe(labels, duration);
    primaryProcessUsage.dec();

    // Diagnostic: Check if it's in the registry
    register.getSingleMetricAsString("auth_http_request_total").then((m) => {
      console.log(`[Metrics] Current auth_http_request_total value:\n${m}`);
    });
  });

  next();
};

export const user_profile_metrics_middleware = (
  req: any,
  res: any,
  next: NextFunction,
) => {
  const startTime = Date.now();
  primaryProcessUsage.inc();

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    const labels = {
      method: req.method,
      route: req.route ? req.route.path : req.path,
      statusCode: res.statusCode,
    };

    userProfileRequestCounter.inc(labels);
    userProfileHttpDurationMs.observe(labels, duration);
    primaryProcessUsage.dec();
  });

  next();
};
