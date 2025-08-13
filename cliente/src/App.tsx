import "./App.css";
import { Test } from "./components/Test/Test.tsx";
import { useAuthContext } from "./context/AuthContext.ts";
import LoginPage from "./pages/LoginPage.tsx";

function App() {
  const { logout } = useAuthContext();

  return (
    <>
      <button onClick={logout}>Logout</button>
      <Test />
      <LoginPage />
    </>
  );
}

export default App;
