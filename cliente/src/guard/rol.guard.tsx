import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { PrivateRoutes, type Roles } from "../models";

interface RoleGuardProps {
  rol: Roles;
}

export const RoleGuard = ({ rol }: RoleGuardProps) => {
  const { auth } = useAuthContext();
  const isAllowed = auth.userInfo?.nombre_rol === rol;

  return (
    <>
      {isAllowed ? <Outlet /> : <Navigate to={`/${PrivateRoutes.PRIVATE}`} />}
    </>
  );
};
