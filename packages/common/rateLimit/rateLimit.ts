import { rateLimit } from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { client } from "@repo/redis-stream/redis-client";

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  statusCode: 429,
  handler: (req, res, next) =>
    res
      .status(429)
      .json(
        "Too many auth requests attemps, please try again after 10 minutes"
      ),
  store: new RedisStore({
    sendCommand: (...args: string[]) => client.call!(...args) as any,
  }),
});

export const submitLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  handler: (req, res, next) => {
    res
      .status(429)
      .json(
        "To many submits requests attemps, please try again after 10 minutes"
      );
  },
  store: new RedisStore({
    sendCommand: (...args: string[]) => client.call!(...args) as any,
  }),
});

export const challengeLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  handler: (req, res, next) => {
    res
      .status(429)
      .json(
        "To many challenge submit requests attemps, please try again after 10 minuters"
      );
  },
  store: new RedisStore({
    sendCommand: (...args: string[]) => client.call!(...args) as any,
  }),
});

export const contestLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  handler: (req, res, next) => {
    res
      .status(429)
      .json(
        "To many contest submit requests attemps, please try again after 10 minuters"
      );
  },
  store: new RedisStore({
    sendCommand: (...args: string[]) => client.call!(...args) as any,
  }),
});
