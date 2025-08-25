import { CSRF_SECRET_KEY, NODE_ENV, SECRET_KEY } from "../config.js";
import { DEFAULT_USERS } from "../libs/roles.js";
import { AuthModel } from "../models/auth.model.js";
import { RoleModel } from "../models/role.model.js";
import { validatePartialUser, validateUser } from "../schemas/user.js";
import { ClientError } from "../utils/errors.js";
import { response } from "../utils/response.js";
import jwt from "jsonwebtoken";

export class AuthController {
  static getUsers = async (req, res) => {
    const result = await AuthModel.getUsers();
    response(res, 200, result);
  };

  static createUser = async (req, res) => {
    const result = validateUser(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      throw new ClientError(JSON.stringify(errors), 400);
    }

    const role = await RoleModel.getRoleByName({
      name: DEFAULT_USERS.USER_ROLE,
    });

    const newUser = await AuthModel.createUser({
      input: result.data,
      roleId: role.id_rol,
    });

    response(res, 201, newUser);
  };

  static login = async (req, res) => {
    const result = validatePartialUser(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      throw new ClientError(JSON.stringify(errors), 400);
    }

    const userInfo = await AuthModel.loginUser({ input: result.data });

    const accessToken = jwt.sign(
      {
        id: userInfo.id_usuario,
        rol: userInfo.nombre_rol,
      },
      SECRET_KEY,
      {
        expiresIn: "5m",
      }
    );

    const csrfToken = jwt.sign(
      { id: userInfo.id_usuario, rol: userInfo.nombre_rol },
      CSRF_SECRET_KEY,
      {
        expiresIn: "5m",
      }
    );

    const refreshToken = await AuthModel.createToken({
      userId: userInfo.id_usuario,
      userAgent: req.headers["user-agent"],
    });

    const expiresIn = 1000 * 60 * 5;

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "none" : "lax",
        maxAge: expiresIn,
        path: "/api",
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "none" : "lax",
        maxAge: 1000 * 60 * 60 * 24,
        path: "/auth/refresh",
      });

    response(res, 200, { userInfo, expiresIn, csrfToken });
  };

  static refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) throw new ClientError("Missing Refresh Token", 401);

    const tokenRecord = await AuthModel.getUserByRefreshToken({ refreshToken });

    if (!tokenRecord || new Date(tokenRecord.expires_at) < new Date())
      throw new ClientError("Unauthorized", 401);

    const user = await AuthModel.getUserById({ id: tokenRecord.user_id });

    const newAccessToken = jwt.sign(
      {
        id: user.id_usuario,
        rol: user.nombre_rol,
      },
      SECRET_KEY,
      { expiresIn: "5m" }
    );

    const newCsrfToken = jwt.sign(
      { id: user.id_usuario, rol: user.nombre_rol },
      CSRF_SECRET_KEY,
      {
        expiresIn: "5m",
      }
    );

    const expiresIn = 1000 * 60 * 5;

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      path: "/api",
      maxAge: expiresIn,
    });

    response(res, 200, {
      message: "Access Token Refresh",
      csrfToken: newCsrfToken,
      expiresIn,
      userInfo: user,
    });
  };

  static clearRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;

    if (refreshToken) await AuthModel.clearCookie({ token: refreshToken });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      path: "/auth/refresh",
    });

    response(res, 200, { message: "Refresh Token Cleared" });
  };

  static clearAccessToken = async (req, res) => {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production" ? "none" : "lax",
      path: "/api",
    });

    response(res, 200, { message: "Access Token Cleared" });
  };
}
