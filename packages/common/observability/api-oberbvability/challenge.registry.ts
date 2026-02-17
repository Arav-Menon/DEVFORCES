import client from "prom-client";
import { register } from "../register";

export const challengeRequestCounter = new client.Counter({
  name: "challenge_http_request_total",
  help: "challenge api requests",
  labelNames: ["method", "route", "statusCode"],
  registers: [register],
});

export const challengeActiveRequests = new client.Gauge({
  name: "challenge_active_requests",
  help: "Number of active request on challenge",
  registers: [register],
});

export const challengeHttpDurationMs = new client.Histogram({
  name: "challenge_http_request_duration_ms",
  help: "Duration of challenge HTTP requests in ms",
  labelNames: ["method", "route", "statusCode"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});

export const challengeDbQueryDurationMs = new client.Histogram({
  name: "challenge_db_query_duration_ms",
  help: "Duration of challenge DB queries in ms",
  labelNames: ["operation", "model", "success"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});

export const challengeIdFetchDurationMs = new client.Histogram({
  name: "challenge_id_fetch_duration_ms",
  help: "Duration of challenge id fetch in ms",
  labelNames: ["operation", "model", "success"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
  registers: [register],
});