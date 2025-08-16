import { useEffect, type ReactNode } from "react";
import styles from "./Modal.module.css";
import { useModalContext } from "./context/ModalContext";
import { createPortal } from "react-dom";

interface ModalProps {
    children: ReactNode;
}

const eventListener = "keydown";

export const ModalRegisterContainer = ({ children }: ModalProps) => {
    const { stateRegister, setStateRegister } = useModalContext();
    const modalRoot = document.getElementById("modal");

    const closeModal = () => {
        setStateRegister(false);
    };

    const handleContentClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setStateRegister(false);
        };

        if (stateRegister) document.addEventListener(eventListener, handleEsc);

        return () => document.removeEventListener(eventListener, handleEsc);
    }, [stateRegister, setStateRegister]);

    if (!stateRegister || !modalRoot) return null;

    return createPortal(
        <div className={styles.overlay} onClick={closeModal}>
            <div className={styles.modal} onClick={handleContentClick}>
                <button onClick={closeModal} className={styles.close_button}>
                    X
                </button>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

