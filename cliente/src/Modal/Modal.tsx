import { useEffect, type ReactNode } from "react";
import styles from "./Modal.module.css";
import { useModalContext } from "./context/ModalContext";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
}

const eventListener = "keydown";

export const Modal = ({ children }: ModalProps) => {
  const { state, setState } = useModalContext();
  const modalRoot = document.getElementById("modal");

  const closeModal = () => {
    setState(false);
  };

  const handleContentClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setState(false);
    };

    if (state) document.addEventListener(eventListener, handleEsc);

    return () => document.removeEventListener(eventListener, handleEsc);
  }, [state, setState]);

  if (!state || !modalRoot) return null;

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
