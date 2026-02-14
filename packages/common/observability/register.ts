import client from "prom-client";

export const register = client.register;
client.collectDefaultMetrics({ register });