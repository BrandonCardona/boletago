import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "./utilities";
import { PrivateRoutes, PublicRoutes, Roles } from "./models";
import { Dashboard, EventEdit, HomePage, LoginPage, Private } from "./pages";
import { AuthGuard } from "./guard/auth.guard";
import { RoleGuard } from "./guard/rol.guard";

export const AppRoutes = () => {
  return (
    <>
      <RoutesWithNotFound>
        <Route
          path="/"
          element={<Navigate replace to={`/${PublicRoutes.HOME}`} />}
        />
        <Route path={`/${PublicRoutes.HOME}`} element={<HomePage />} />
        <Route path={`/${PublicRoutes.LOGIN}`} element={<LoginPage />} />

        <Route element={<AuthGuard />}>
          <Route path={`/${PrivateRoutes.PRIVATE}/*`} element={<Private />} />
        </Route>

        <Route element={<RoleGuard rol={Roles.ADMIN} />}>
          <Route path={`/${PrivateRoutes.DASHBOARD}`} element={<Dashboard />} />
          <Route
            path={`/${PrivateRoutes.EDIT}/${PrivateRoutes.EVENT_DETAIL_PARAM}`}
            element={<EventEdit />}
          />
        </Route>
      </RoutesWithNotFound>
    </>
  );
};
