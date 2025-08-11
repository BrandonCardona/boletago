import { SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken";

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
