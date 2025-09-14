import { RateLimiterMemory } from "rate-limiter-flexible";
import { ClientError } from "../utils/errors.js";

const limiter = new RateLimiterMemory({
  points: 3,
  duration: 60 * 1,
});

export const bruteForceLogin = async (req, res, next) => {
  try {
    const ip = req.ip;
    await limiter.consume(ip);
    next();
  } catch {
    throw new ClientError(
      "Too many failed login attempts. Try again later.",
      429
    );
  }
};
