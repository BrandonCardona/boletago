import "./App.css";
import { AppRoutes } from "./AppRoutes.tsx";
import { Header, LoadingScreen } from "./components/index.ts";
import { useAuthContext } from "./context/AuthContext.ts";

function App() {
  const { isLoading } = useAuthContext();

  if (isLoading) return <LoadingScreen active={isLoading} />;

  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
