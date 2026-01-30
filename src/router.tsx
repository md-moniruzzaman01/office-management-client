import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./private route/PrivateRoute";
import Layout from "./Layout/Layout";

import { leaveRoutes } from "./routes/Leave Routes/LeaveHistory";
import { profileRoutes } from "./routes/Profile/profile";
import { authRoutes } from "./routes/Authentication Routes/auth";
import { userRoutes } from "./routes/User/user";
import { departmentRoutes } from "./routes/Department/department";
import { holidayRoutes } from "./routes/Holiday/holiday";
import { eventRoutes } from "./routes/Events/event";
import { chatRoutes } from "./routes/Chatting/Chat";
import { activitiesRoutes } from "./routes/Activities/activities";
import { attendanceRoutes } from "./routes/Attendance/attendance";
import { dashboardRoutes } from "./routes/Dashboard/dashboard";
import { lateRoutes } from "./routes/Late-Routes/Late-Appear";
import { branchRoutes } from "./routes/Branch/Branch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    errorElement: "",
    children: [
      ...dashboardRoutes,
      ...chatRoutes,
      ...lateRoutes,
      ...leaveRoutes,
      ...attendanceRoutes,
      ...profileRoutes,
      ...userRoutes,
      ...branchRoutes,
      ...departmentRoutes,
      ...holidayRoutes,
      ...eventRoutes,
      ...activitiesRoutes,
    ],
  },
  ...authRoutes,
]);
