import { ClientError } from "../utils/errors.js";

export const requireAuth = (req, res, next) => {
  if (!req.session?.user) throw new ClientError("Access not authorized", 401);
  next();
};
