import { CSRF_SECRET_KEY, SECRET_KEY } from "../config.js";
import { ClientError } from "../utils/errors.js";
import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.session?.user;
  const csrfToken = req.get("X-CSRF-Token");

  if (!token || !csrfToken) throw new ClientError("Access not authorized", 401);

  try {
    const { id: userIdFromAccess } = req.session.user;
    const { id: userIdFromCsrf } = jwt.verify(csrfToken, CSRF_SECRET_KEY);

    if (userIdFromAccess !== userIdFromCsrf)
      throw new ClientError("Tokens are not valid", 401);
  } catch {
    throw new ClientError("Unauthorized", 401);
  }

  next();
};
