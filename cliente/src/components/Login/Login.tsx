import type { ReactNode } from "react";

interface LoginProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
  styles: CSSModuleClasses;
}

export const Login = ({ handleSubmit, children, styles }: LoginProps) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        {children}
        <input
          className={`${styles.input} ${styles.correo}`}
          type="email"
          id="correo"
          name="correo"
          required
          placeholder="Correo Electronico"
        />
        <input
          className={`${styles.input} ${styles.contraseña}`}
          type="password"
          id="contraseña"
          name="contraseña"
          required
          placeholder="Contraseña"
        />
        <button className={styles.botonLogin} type="submit">
          Iniciar sesion
        </button>
      </form>
    </>
  );
};
