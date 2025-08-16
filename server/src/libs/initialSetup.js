import { RoleModel } from "../models/role.model.js";
import { ClientError } from "../utils/errors.js";
import { DEFAULT_USERS } from "./roles.js";

export const createRoles = async () => {
  try {
    const count = await RoleModel.getRoles();

    if (count > 0) return;

    const values = await Promise.all([
      RoleModel.createRole({ roleName: DEFAULT_USERS.USER_ROLE }),
      RoleModel.createRole({ roleName: DEFAULT_USERS.MODERATOR_ROLE }),
      RoleModel.createRole({ roleName: DEFAULT_USERS.ADMIN_ROLE }),
    ]);
  } catch (err) {
    throw new ClientError("Internal Error", 500);
  }
};
