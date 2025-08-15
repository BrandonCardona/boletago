import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { ModalProvider } from "./Modal/context/ModalProvider";

export const AppHookContainer = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};
