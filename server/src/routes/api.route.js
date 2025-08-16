import { Router } from "express";
import { WrappedAuthController } from "../controller/index.js";
import { eventoRouter } from "./evento.route.js";

export const apiRouter = Router();

apiRouter.use("/eventos", eventoRouter);
apiRouter.get("/logout", WrappedAuthController.clearAccessToken);
