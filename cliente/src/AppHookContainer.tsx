import App from "./App";
import { AuthProvider } from "./context/AuthProvider";

export const AppHookContainer = () => {
  return (
    <>
      <AuthProvider>
        <App />
      </AuthProvider>
    </>
  );
};
