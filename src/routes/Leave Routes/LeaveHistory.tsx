import AdminApproveList from "../../modules/Leave Pages/Admin Approve List/AdminApproveList";
import GenerateLeaveLetter from "../../modules/Leave Pages/Generate Leave Letter/GenerateLeaveLetter";
import LeaveHistoryEdit from "../../modules/Leave Pages/Leave History Edit/LeaveHistoryEdit";
import LeaveHistory from "../../modules/Leave Pages/Leave History/LeaveHistory";
import LeaveLetter from "../../modules/Leave Pages/Leave Letter/LeaveLetter";

export const leaveRoutes = [
  {
    path: "/generate-letter",
    element: <GenerateLeaveLetter />,
  },
  {
    path: "/leave-history",
    element: <LeaveHistory />,
  },
  {
    path: "/leave-letter/:id",
    element: <LeaveLetter />,
  },
  {
    path: "/admin-approval",
    element: <AdminApproveList />,
  },
  {
    path: "/leave-history-edit/:id",
    element: <LeaveHistoryEdit />,
  },
];
