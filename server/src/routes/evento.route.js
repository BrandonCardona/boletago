import { Router } from "express";
import { WrappeEventosController } from "../controller/index.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { hasRole } from "../middlewares/auth.js";
import { DEFAULT_USERS } from "../libs/roles.js";

export const eventoRouter = Router();

eventoRouter.get("/eventos", WrappeEventosController.getEventos);
eventoRouter.get("/:id", [requireAuth], WrappeEventosController.getEventoById);
eventoRouter.post(
  "/post",
  [requireAuth, hasRole()],
  WrappeEventosController.postEvento
);
eventoRouter.put(
  "/put/:id",
  [requireAuth, hasRole()],
  WrappeEventosController.putEvento
);
eventoRouter.delete(
  "/delete/:id",
  [requireAuth, hasRole()],
  WrappeEventosController.deleteEvento
);
