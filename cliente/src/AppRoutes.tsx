import { Navigate, Route } from "react-router-dom";
import { RoutesWithNotFound } from "./utilities";
import { PrivateRoutes, PublicRoutes } from "./models";
import { HomePage, LoginPage, Private } from "./pages";
import { AuthGuard } from "./guard/auth.guard";

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
      </RoutesWithNotFound>
    </>
  );
};
