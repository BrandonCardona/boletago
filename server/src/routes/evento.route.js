import { Router } from "express";
import { WrappeEventosController } from "../controller/index.js";

export const eventoRouter = Router();

eventoRouter.get("/eventos", WrappeEventosController.getEventos);
eventoRouter.get("/:id", WrappeEventosController.getEventoById);