import { SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";
import { DEFAULT_USERS } from "../libs/roles.js";
import { ClientError } from "../utils/errors.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };

  if (token) {
    try {
      req.session.user = jwt.verify(token, SECRET_KEY);
    } catch {}
  }

  next();
};

export const hasRole = (...allowedRoles) => {
  return async (req, res, next) => {
    const { user } = req.session;

    if (!user) throw new ClientError("Unauthorized", 401);

    const isAdmin = user.rol === DEFAULT_USERS.ADMIN_ROLE;

    if (allowedRoles.length === 0) {
      if (!isAdmin) throw new ClientError("Forbidden", 403);
      return next();
    }

    const hasAccess = allowedRoles.includes(user.rol);

    if (!hasAccess && !isAdmin) throw new ClientError("Forbidden", 403);

    next();
  };
};
