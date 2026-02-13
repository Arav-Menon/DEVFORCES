import client from "prom-client";

export const register = client.register;

// client.collectDefaultMetrics({ register });

export const authRequestCounter = new client.Counter({
  name: "auth_http_request_total",
  help: "Auth Api requests",
  labelNames: ["method", "route", "statusCode", 'response_time'],
  registers: [register],
});

export const primaryProcessUsage = new client.Gauge({
  name: "active_requests",
  help: "Number of active requests",
});

export const auth_http_duration_ms = new client.Histogram({
    name: 'aut_http_request_duration_ms',
    help: 'Duration of auth HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000]
});