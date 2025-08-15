import { createContext, useContext } from "react";

interface ModalContextProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  pendingPath: string;
  setPendingPath: React.Dispatch<React.SetStateAction<string>>;
}

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) throw new Error("Modal is been used outside its provider");

  return context;
};
