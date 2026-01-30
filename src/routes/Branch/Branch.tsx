import Branch from "../../modules/Branch Page/Branch List/BranchList";
import BranchCreate from "../../modules/Branch Page/Branch Create/BranchCreate";
import BranchEdit from "../../modules/Branch Page/Branch Edit/BranchEdit";

export const branchRoutes = [
  {
    path: "/branches",
    element: <Branch />,
  },
  {
    path: "/branches/branches-create",
    element: <BranchCreate />,
  },
  {
    path: "/branches/branches-edit/:id",
    element: <BranchEdit />,
  },
];
