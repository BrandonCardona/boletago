import { useState, type ReactNode } from "react";
import { ModalContext } from "./ModalContext";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, setState] = useState(false);
  const [pendingPath, setPendingPath] = useState("");

  return (
    <>
      <ModalContext.Provider
        value={{ state, setState, pendingPath, setPendingPath }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
};
