import { Router } from "express";
import { WrappeEventosController } from "../controller/index.js";
import { requireAuth } from "../middlewares/requireAuth.js";
import { hasRole } from "../middlewares/auth.js";
import { DEFAULT_USERS } from "../libs/roles.js";

export const eventoRouter = Router();

eventoRouter.get("/eventos", WrappeEventosController.getEventos);
eventoRouter.get(
  "/:id",
  [requireAuth, hasRole(DEFAULT_USERS.USER_ROLE)],
  WrappeEventosController.getEventoById
);
