import pool from "../db.js";

export class RoleModel {
  static getRoles = async () => {
    const result = await pool.query(
      `SELECT id_rol, nombre_rol FROM rol
        ORDER BY id_rol ASC `
    );
    return result.rows.length;
  };

  static getRoleById = async ({ roleId }) => {
    const result = await pool.query(
      `SELECT id_rol, nombre_rol FROM rol WHERE id_rol = $1`,
      [roleId]
    );
    return result.rows[0];
  };

  static getRoleByName = async ({ name }) => {
    const result = await pool.query(
      `SELECT id_rol, nombre_rol FROM rol WHERE nombre_rol = $1`,
      [name]
    );
    return result.rows[0];
  };

  static createRole = async ({ roleName }) => {
    await pool.query(
      `INSERT INTO public.rol(nombre_rol)
	VALUES ($1);`,
      [roleName]
    );
  };
}
