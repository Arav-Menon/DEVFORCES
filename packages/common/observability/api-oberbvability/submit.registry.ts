import client from "prom-client";
import { register } from "../register";

export const submitRequestCounter = new client.Counter({
  name: "submit_http_request_total",
  help: "submit api requests",
  labelNames: ["method", "route", "statusCode"],
  registers: [register],
});

export const submitActiveRequests = new client.Gauge({
  name: "submit_active_requests",
  help: "Number of active request on submit",
  registers: [register],
});

export const submitHttpDurationMs = new client.Histogram({
  name: "submit_http_request_duration_ms",
  help: "Duration of submit HTTP requests in ms",
  labelNames: ["method", "route", "statusCode"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});

export const submitDbQueryDurationMs = new client.Histogram({
  name: "submit_db_query_duration_ms",
  help: "Duration of submit DB queries in ms",
  labelNames: ["operation", "model", "success"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});

export const submitIdFetchDurationMs = new client.Histogram({
  name: "submit_id_fetch_duration_ms",
  help: "Duration of submit id fetch in ms",
  labelNames: ["operation", "model", "success"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});
