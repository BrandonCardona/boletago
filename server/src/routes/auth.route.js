import { Router } from "express";
import { WrappedAuthController } from "../controller/index.js";

export const authRouter = Router();

authRouter.get("/", WrappedAuthController.getUsers);
authRouter.post("/login", WrappedAuthController.login);
authRouter.post("/register", WrappedAuthController.register);
authRouter.post("/refresh/refresh-token", WrappedAuthController.refresh);
authRouter.get("/refresh/logout", WrappedAuthController.clearRefreshToken);
