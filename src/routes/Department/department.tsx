import DepartmentCreate from "../../modules/Department Page/Department Create/DepartmentCreate";
import DepartmentEdit from "../../modules/Department Page/Department Edit/DepartmentEdit";
import DepartmentList from "../../modules/Department Page/Department List/DepartmentList";

export const departmentRoutes = [
  {
    path: "/departments",
    element: <DepartmentList />,
  },
  {
    path: "/departments/department-create",
    element: <DepartmentCreate />,
  },
  {
    path: "/departments/department-edit/:id",
    element: <DepartmentEdit />,
  },
];
