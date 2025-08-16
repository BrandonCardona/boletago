import type { ReactNode } from "react";

interface RegisterProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children?: ReactNode;
    styles: CSSModuleClasses;
}

export const Register = ({ handleSubmit, children, styles }: RegisterProps) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                {children}
                <input
                    className={`${styles.input} ${styles.nombre}`}
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    placeholder="Nombre"
                />
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
                    Registrarme
                </button>
            </form>
        </>
    );
};
