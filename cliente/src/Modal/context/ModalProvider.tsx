import { useState, type ReactNode } from "react";
import { ModalContext } from "./ModalContext";

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [state, setState] = useState(false);
  const [pendingPath, setPendingPath] = useState("");
  const [stateRegister, setStateRegister] = useState(false);
  const [stateDelete, setStateDelete] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);

  return (
    <>
      <ModalContext.Provider
        value={{ state, setState, stateRegister, setStateRegister, stateDelete, setStateDelete, pendingPath, setPendingPath, eventToDelete, setEventToDelete }}
      >
        {children}
      </ModalContext.Provider>
    </>
  );
};
