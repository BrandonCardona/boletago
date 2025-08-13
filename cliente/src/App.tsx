import "./App.css";
import { VITE_API_URL } from "./config";
import LoginPage from "./pages/LoginPage.tsx";

function App() {
  console.log(VITE_API_URL);

  return <LoginPage />;
}

export default App;
