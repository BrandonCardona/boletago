import dotenv from "dotenv";

dotenv.config({
  quiet: true,
});

export const {
  PORT,
  FRONTEND_ORIGIN,
  DB_USER,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  SALT_ROUNDS,
  SECRET_KEY,
  NODE_ENV,
} = process.env;
