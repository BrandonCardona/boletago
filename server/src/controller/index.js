import { AuthController } from "./auth.controller.js";
import { catchedAsync } from "../utils/catchedAsync.js";

export const WrappedAuthController = {
  getUsers: catchedAsync(AuthController.getUsers),
  register: catchedAsync(AuthController.createUser),
  login: catchedAsync(AuthController.login),
  refresh: catchedAsync(AuthController.refreshToken),
  clearRefreshToken: catchedAsync(AuthController.clearRefreshToken),
  clearAccessToken: catchedAsync(AuthController.clearAccessToken),
};
