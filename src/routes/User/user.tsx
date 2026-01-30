import CreateUserForm from "../../modules/User Pages/User Create/UserCreate";
import UserEdit from "../../modules/User Pages/User Edit/UserEdit";
import UserList from "../../modules/User Pages/User List/UserList";

export const userRoutes = [
  {
    path: "/users",
    element: <UserList />,
  },
  {
    path: "/users/user-create",
    element: <CreateUserForm />,
  },
  {
    path: "/users/user-edit/:id",
    element: <UserEdit />,
  },
];
