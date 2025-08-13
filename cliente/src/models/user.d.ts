export interface UserInfo {
  id_usuario: number;
  nombre: string;
  correo: string;
  nombre_rol: string;
}

export interface LoginProps {
  email: string;
  password: string;
}
