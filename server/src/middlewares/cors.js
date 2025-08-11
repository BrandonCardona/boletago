import cors from "cors";
import { FRONTEND_ORIGIN } from "../config.js";

const ACCEPTED_ORIGINS = [FRONTEND_ORIGIN];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }
      if (!origin) {
        return callback(null, false);
      }

      return callback(new Error("Not alloweb by CORS"));
    },
  });
};
