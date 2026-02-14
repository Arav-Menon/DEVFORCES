import client from "prom-client";
import { register } from "../register";

export const contestRequestCounter = new client.Counter({
  name: "contest_http_request_total",
  help: "contest api requests",
  labelNames: ["method", "route", "statusCode"],
  registers: [register],
});

export const contestActiveRequests = new client.Gauge({
  name: "contest_active_requests",
  help: "Number of active request on contest",
  registers: [register],
});

export const contestHttpDurationMs = new client.Histogram({
  name: "contest_http_request_duration_ms",
  help: "Duration of contest HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});

export const contestDbQueryDurationMs = new client.Histogram({
  name: "contest_db_query_duration_ms",
  help: "Duration of contest DB queries in ms",
  labelNames: ["operation", "model", "success"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});
