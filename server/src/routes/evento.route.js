import { Router } from "express";
import { WrappeEventosController } from "../controller/index.js";
import { requireAuth } from "../middlewares/requireAuth.js";

export const eventoRouter = Router();

eventoRouter.get("/eventos", WrappeEventosController.getEventos);
eventoRouter.get("/:id", requireAuth, WrappeEventosController.getEventoById);
