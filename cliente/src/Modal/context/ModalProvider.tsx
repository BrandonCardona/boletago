import { useState, type ReactNode } from "react";
import { ModalContext } from "./ModalContext";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, setState] = useState(false);
  const [pendingPath, setPendingPath] = useState("");
  const [stateRegister, setStateRegister] = useState(false);


  return (
    <>
      <ModalContext.Provider
        value={{ state, setState, stateRegister, setStateRegister, pendingPath, setPendingPath }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
};
