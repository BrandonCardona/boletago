import { AuthController } from "./auth.controller.js";
import { catchedAsync } from "../utils/catchedAsync.js";
import { EventoController } from "./evento.controller.js";

export const WrappedAuthController = {
  getUsers: catchedAsync(AuthController.getUsers),
  register: catchedAsync(AuthController.createUser),
  login: catchedAsync(AuthController.login),
  refresh: catchedAsync(AuthController.refreshToken),
  clearRefreshToken: catchedAsync(AuthController.clearRefreshToken),
  clearAccessToken: catchedAsync(AuthController.clearAccessToken),
};

export const WrappeEventosController = {
  getEventos: catchedAsync(EventoController.getEventos),
  getEventoById: catchedAsync(EventoController.getEventoById),
  postEvento: catchedAsync(EventoController.postEvento),
  putEvento: catchedAsync(EventoController.putEvento),
  deleteEvento: catchedAsync(EventoController.deleteEvento),
  getArtistas: catchedAsync(EventoController.getArtistas),
  getEstadios: catchedAsync(EventoController.getEstadios)
}
