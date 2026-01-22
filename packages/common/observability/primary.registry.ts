import client from "prom-client";

// Use the default register which supports cluster aggregation
export const register = client.register;

// Collect default metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

export const authRequestCounter = new client.Counter({
  name: "http_request_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "statusCode"],
  registers: [register],
});
