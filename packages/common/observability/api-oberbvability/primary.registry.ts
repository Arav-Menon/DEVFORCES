import client from "prom-client";

export const register = client.register;

client.collectDefaultMetrics({ register });

export const authRequestCounter = new client.Counter({
  name: "auth_http_request_total",
  help: "Auth Api requests",
  labelNames: ["method", "route", "statusCode"],
  registers: [register],
});

export const primaryProcessUsage = new client.Gauge({
  name: "active_requests",
  help: "Number of active requests",
});
