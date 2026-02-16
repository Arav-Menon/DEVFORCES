import client from "prom-client";
import { register } from "../register";

export const authRequestCounter = new client.Counter({
  name: "auth_http_request_total",
  help: "Auth Api requests",
  labelNames: ["method", "route", "statusCode"],
  registers: [register],
});

export const primaryProcessUsage = new client.Gauge({
  name: "active_requests",
  help: "Number of active requests",
  registers: [register],
});

export const authHttpDurationMs = new client.Histogram({
  name: "auth_http_request_duration_ms",
  help: "Duration of auth HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});

export const authDbQueryDurationMs = new client.Histogram({
  name: "auth_db_query_duration_ms",
  help: "Duration of auth DB queries in ms",
  labelNames: ["operation", "model", "success"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});

export const userProfileRequestCounter = new client.Counter({
  name: "user_profile_http_request_total",
  help: "user profile Api requests",
  labelNames: ["method", "route", "statusCode"],
  registers: [register],
});

export const userProfileDbQueryDurationMs = new client.Histogram({
  name: "user_profile_db_query_duration_ms",
  help: "Duration of fetching user profile from DB in ms",
  labelNames: ["operation", "model", "success"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});

export const userProfileHttpDurationMs = new client.Histogram({
  name: "user_profile_http_duration_ms",
  help: "Duration of user profile fetch HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});
