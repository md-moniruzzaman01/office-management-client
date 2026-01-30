import LoginPage from "../../modules/Authentication Pages/Login/Login";
import UnauthorizedPage from "../../modules/Authentication Pages/UnAuthorized/UnAuthorized";

export const authRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
];
