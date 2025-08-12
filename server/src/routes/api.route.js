import { Router } from "express";
import { WrappedAuthController} from "../controller/index.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import {eventoRouter} from "./evento.route.js";

export const apiRouter = Router();

apiRouter.get("/", requireAuth, (req, res) => {
  res.json({ message: "It Works" });
});
apiRouter.get("/logout", WrappedAuthController.clearAccessToken);
apiRouter.use("/eventos", requireAuth , eventoRouter);

