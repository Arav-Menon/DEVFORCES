import { rateLimit } from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 50,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  statusCode: 429,
  handler: (req, res, next) =>
    res
      .status(429)
      .send(
        "Too many auth requests attemps, please try again after 10 minutes"
      ),
});
