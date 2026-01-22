import client from "prom-client";

const register = new client.Registry();

export const authRequestCounter = new client.Counter({
  name: "http_request_total",
  help: "Total number of HTTP request",
  labelNames: ["method", "route", "statusCode"],
  registers: [register],
});
