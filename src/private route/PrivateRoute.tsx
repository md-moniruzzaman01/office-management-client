/* eslint-disable @typescript-eslint/no-explicit-any */
import { matchPath, Navigate, useLocation } from "react-router-dom";
import { PrivateRouteProps } from "./config/types";
import { getFromLocalStorage } from "../shared/Helpers/local_storage";
import { authKey } from "../shared/config/constaints";
import { getUser } from "../shared/Helpers/jwt";
import { useGetSingleUserQuery } from "../redux/features/api/Users/user";
import LoadingPage from "../common/LoadingPage/LoadingPage";

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = getFromLocalStorage(authKey);
  const userInfo:
    | {
        userID: string;
        role: string;
        powers: number[];
        email: string;
      }
    | any = getUser();

  const { data: singleUser, isLoading } = useGetSingleUserQuery(
    {
      token,
      id: userInfo?.id,
    },
    { skip: !userInfo?.id }
  );

  const location = useLocation();

  const unauthorizedRoutes = ["/"];
  const isUnauthorized =
    !["SUPER_ADMIN", "ADMIN","EMPLOYEE"].includes(userInfo?.role) &&
    unauthorizedRoutes.some((route) => matchPath(route, location.pathname));

  if (isUnauthorized) {
    return <Navigate state={location.pathname} to="/unauthorized" />;
  }

  if (isLoading) {
    return <LoadingPage fullPage />;
  }

  if (singleUser?.data) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login" />;
};

export default PrivateRoute;
