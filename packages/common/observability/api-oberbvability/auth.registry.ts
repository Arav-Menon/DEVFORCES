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

export const auth_http_duration_ms = new client.Histogram({
  name: "auth_http_request_duration_ms",
  help: "Duration of auth HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});

export const auth_db_query_duration_ms = new client.Histogram({
  name: "auth_db_query_duration_ms",
  help: "Duration of auth DB queries in ms",
  labelNames: ["operation", "model", "success"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});
