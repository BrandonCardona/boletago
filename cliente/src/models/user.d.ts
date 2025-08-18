import type { Roles } from "./roles";

export interface UserInfo {
  id_usuario: number;
  nombre: string;
  correo: string;
  nombre_rol: Roles;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
}
