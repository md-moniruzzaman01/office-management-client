import CreateLateAppearance from "../../modules/late appearance Pages/Create Late Application/CreateLateAppearance";
import LateAppearanceEdit from "../../modules/late appearance Pages/Late History Edit/LateHistoryEdit";
import LateHistory from "../../modules/late appearance Pages/Late History/LateHistory";
import LateApplication from "../../modules/late appearance Pages/Late Letter/LateApplication";

export const lateRoutes = [
  {
    path: "/create-late-appearance",
    element: <CreateLateAppearance />,
  },
  {
    path: "/late-appearance",
    element: <LateHistory />,
  },
  {
    path: "/late-application/:id",
    element: <LateApplication />,
  },
  // {
  //   path: "/admin-approval",
  //   element: <AdminApproveList />,
  // },
  {
    path: "/late-appearance-edit/:id",
    element: <LateAppearanceEdit />,
  },
];
