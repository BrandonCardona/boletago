import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { PublicRoutes } from "../models";

export const AuthGuard = () => {
  const { auth, isLoading } = useAuthContext();

  if (isLoading) return null;

  return (
    <>
      {auth.userInfo ? (
        <Outlet />
      ) : (
        <Navigate replace to={`/${PublicRoutes.LOGIN}`} />
      )}
    </>
  );
};
