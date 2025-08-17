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
eventoRouter.post(  
    "/post",  
    [requireAuth, hasRole(DEFAULT_USERS.USER_ROLE)],
  WrappeEventosController.postEvento
);
eventoRouter.put(  
    "/put/:id",  
    [requireAuth, hasRole(DEFAULT_USERS.USER_ROLE)],
  WrappeEventosController.putEvento
);

eventoRouter.delete(
  "/delete/:id",
  [requireAuth, hasRole(DEFAULT_USERS.USER_ROLE)],
  WrappeEventosController.deleteEvento
)

