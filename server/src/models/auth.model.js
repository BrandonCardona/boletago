import pool from "../db.js";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../config.js";
import { ClientError } from "../utils/errors.js";
import { randomUUID } from "node:crypto";
import { addHours } from "date-fns";

export class AuthModel {
  static getUsers = async () => {
    const result = await pool.query(
      "SELECT id_usuario, nombre, correo, contrasena, id_rol FROM usuario"
    );
    return result.rows;
  };

  static getUserById = async ({ id }) => {
    const result = await pool.query(
      `SELECT U.id_usuario, U.nombre, 
      U.correo, R.nombre_rol 
      FROM usuario as U INNER JOIN rol as R ON (R.id_rol = U.id_rol) 
      WHERE id_usuario = $1`,
      [id]
    );
    if (result.rows.length === 0)
      throw new ClientError("User does not exits", 400);

    return result.rows[0];
  };

  static createUser = async ({ input, roleId }) => {
    const { name, email, password } = input;

    const hashedPassword = await bcrypt.hash(password, parseInt(SALT_ROUNDS));

    const result = await pool.query(
      `INSERT INTO usuario
      (nombre, correo, contrasena, id_rol)
	    VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, hashedPassword, roleId]
    );

    return result.rows[0];
  };
  static loginUser = async ({ input }) => {
    const { email, password } = input;

    const result = await pool.query(
      `SELECT U.id_usuario, U.nombre, 
      U.correo, U.contrasena, R.nombre_rol 
      FROM usuario as U INNER JOIN rol as R ON (R.id_rol = U.id_rol) 
      WHERE U.correo = $1`,
      [email]
    );
    if (result.rows.length === 0)
      throw new ClientError("User does not exits", 400);

    const user = result.rows[0];

    const isValid = await bcrypt.compare(password, user.contrasena);

    if (!isValid) throw new ClientError("Invalid Password", 401);

    const { contrasena, ...publicUser } = user;

    return publicUser;
  };

  static createToken = async ({ userId, userAgent = "unknown" }) => {
    const id = randomUUID();
    const refreshToken = randomUUID();
    const expiresAt = addHours(new Date(), 24);

    await pool.query(
      `INSERT INTO refresh_tokens
        (id, user_id, token, expires_at, user_agent)
	      VALUES ($1, $2, $3, $4, $5);`,
      [id, userId, refreshToken, expiresAt, userAgent]
    );

    return refreshToken;
  };

  static clearCookie = async ({ token }) => {
    const result = await pool.query(
      `DELETE FROM refresh_tokens 
      WHERE token = $1`,
      [token]
    );
  };

  static getUserByRefreshToken = async ({ refreshToken }) => {
    const result = await pool.query(
      `SELECT user_id, expires_at FROM 
      refresh_tokens WHERE token = $1`,
      [refreshToken]
    );

    if (result.rows.length === 0)
      throw new ClientError(`User not Found by Refresh Token`, 401);

    return result.rows[0];
  };
}
