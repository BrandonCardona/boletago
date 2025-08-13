import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { PublicRoutes } from "../../models";
import styles from "./HeaderButtons.module.css";

export const SessionButton = () => {
  const navigate = useNavigate();
  const { auth, logout } = useAuthContext();
  const sessionText = auth.userInfo ? "Logout" : "Login";

  const handleSession = () => {
    if (!auth.userInfo) {
      return navigate(`/${PublicRoutes.LOGIN}`);
    }
    logout();
    navigate(`/${PublicRoutes.HOME}`);
  };

  return (
    <>
      <li className={styles.session_button} onClick={handleSession}>
        {sessionText}
      </li>
    </>
  );
};
