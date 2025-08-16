import type { ReactNode } from "react";
import { useModalContext } from "../../Modal/context/ModalContext";

interface LoginProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
  styles: CSSModuleClasses;
}

export const Login = ({ handleSubmit, children, styles }: LoginProps) => {
const { setState, setStateRegister } = useModalContext();

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
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setState(false);      
            setStateRegister(true); 
          }}
        >
          Crear una cuenta
        </a>

      </form>
    </>
  );
};
