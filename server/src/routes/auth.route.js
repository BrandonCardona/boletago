import { Router } from "express";
import { WrappedAuthController } from "../controller/index.js";
import { bruteForceLogin } from "../middlewares/bruteForce.js";

export const authRouter = Router();

authRouter.post("/login", bruteForceLogin, WrappedAuthController.login);
authRouter.post("/register", WrappedAuthController.register);
authRouter.post("/refresh/refresh-token", WrappedAuthController.refresh);
authRouter.get("/refresh/logout", WrappedAuthController.clearRefreshToken);
