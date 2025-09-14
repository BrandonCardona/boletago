import express, { json } from "express";
import { authRouter } from "./routes/auth.route.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { resError } from "./utils/resError.js";
import { normalizarError } from "./utils/codigosErrores.js";
import cookieParser from "cookie-parser";
import { apiRouter } from "./routes/api.route.js";
import { authMiddleware } from "./middlewares/auth.js";
import { createRoles } from "./libs/initialSetup.js";
import { rateLimiter } from "./middlewares/rateLimiter.js";

const app = express();
createRoles();

app.use(json());
app.use(rateLimiter);
app.use(corsMiddleware());
app.use(cookieParser());
app.disable("x-powered-by");

app.use("/api", authMiddleware);

app.use("/auth", authRouter);

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  const { status, message } = normalizarError(err);

  return resError({ res, status, message });
});

export default app;
