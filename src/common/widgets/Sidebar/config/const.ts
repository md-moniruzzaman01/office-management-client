import {
  AlarmClockMinus,
  BotMessageSquare,
  Calendar1,
  ChartBarBig,
  ClipboardList,
  Flame,
  FolderClock,
  LayoutDashboard,
  NotebookPen,
  Split,
  TentTree,
  User,
  Users,
} from "lucide-react";

export const dashboardSidebarLinks = [
  {
    url: "/",
    pageTitle: "Dashboard",
    icon: LayoutDashboard,
    access: ["user", "admin", "super_admin"],
  },
  {
    url: "/chatting",
    pageTitle: "Chatting",
    icon: BotMessageSquare,
    access: ["admin", "super_admin"],
  },
  {
    url: "/users",
    pageTitle: "Users",
    icon: Users,
    access: ["admin", "super_admin"],
  },
  {
    url: "/branches",
    pageTitle: "Branch",
    icon: Split,
    access: ["admin", "super_admin"],
  },
  {
    url: "/departments",
    pageTitle: "Departments",
    icon: Flame,
    access: ["admin", "super_admin"],
  },

  {
    url: "/admin-approval",
    pageTitle: "Leave Request",
    icon: NotebookPen,
    access: ["admin", "super_admin"],
  },
  {
    url: "/leave-history",
    pageTitle: "Leave History",
    icon: FolderClock,
    access: ["user", "admin", "super_admin"],
  },
  {
    url: "/attendance",
    pageTitle: "Attendance",
    icon: ChartBarBig,
    access: ["admin", "super_admin"],
  },
  {
    url: "/late-appearance",
    pageTitle: "Late Appearance",
    icon: AlarmClockMinus,
    access: ["user", "admin", "super_admin"],
  },

  {
    url: "/holidays",
    pageTitle: "Holidays",
    icon: TentTree,
    access: ["user", "admin", "super_admin"],
  },
  {
    url: "/event",
    pageTitle: "Events",
    icon: Calendar1,
    access: ["user", "admin", "super_admin"],
  },
  {
    url: "/activities",
    pageTitle: "Activities",
    icon: ClipboardList,
    access: ["user", "admin", "super_admin"],
  },
  {
    url: "/profile",
    pageTitle: "Profile",
    icon: User,
    access: ["user", "admin", "super_admin"],
  },
];

// export const dashboardSidebarLinks = [
//   {
//     url: "/dashboard/home",
//     pageTitle: "Dashboard",
//     icon: icons?.dashboard,
//     access: ["user", "admin", "super_admin"],
//   },
//   {
//     mainLabel: "Loan",
//     icon: icons?.coins,
//     access: ["user", "admin", "super_admin"],

//     subLinks: [
//       {
//         url: "/added-product",
//         pageTitle: "Inventory",
//         icon: icons?.bufferIn,
//         access: ["user", "admin", "super_admin"],
//       },
//       {
//         url: "/order-out",
//         pageTitle: "Order Out",
//         icon: icons?.orderOut,
//         access: ["user", "admin", "super_admin"],
//       },
//       {
//         url: "/part-list",
//         pageTitle: "Part List",
//         icon: icons?.partsList,
//         access: ["user", "admin", "super_admin"],
//       },

//       {
//         url: "/warehouse",
//         pageTitle: "Warehouse",
//         icon: icons?.warehouse,
//         access: ["user", "admin", "super_admin"],
//       },
//     ],
//   },

//   {
//     mainLabel: "POD",
//     icon: icons?.podMain,
//     access: ["user", "admin", "super_admin"],

//     subLinks: [
//       {
//         url: "/dashboard/change-password",
//         pageTitle: "POD",
//         icon: icons?.pod,
//         access: ["user", "admin", "super_admin"],
//       },
//       {
//         url: "/dashboard/customers",
//         pageTitle: "Event List",
//         icon: icons?.event,
//         access: ["user", "admin", "super_admin"],
//       },
//       {
//         url: "/products-list",
//         pageTitle: "Product List",
//         icon: icons?.partsList,
//         access: ["user", "admin", "super_admin"],
//       },
//     ],
//   },

//   {
//     url: "/dashboard/customers",
//     pageTitle: "Customer",
//     icon: icons?.partners,
//     access: ["user", "admin", "super_admin"],
//   },
//   {
//     url: "/dashboard/recipients",
//     pageTitle: "Recipient",
//     icon: icons?.users,
//     access: ["user", "admin", "super_admin"],
//   },

//   {
//     url: "/dashboard/delivery-agents",
//     pageTitle: "Delivery Agent",
//     icon: icons?.delivery,
//     access: ["user", "admin", "super_admin"],
//   },
//   {
//     url: "/dashboard/order-list",
//     pageTitle: "Order",
//     icon: icons?.order,
//     access: ["user", "admin", "super_admin"],
//   },
//   {
//     url: "/dashboard/update-tracking-status",
//     pageTitle: "Update Status",
//     icon: icons?.update,
//     access: ["user", "admin", "super_admin"],
//   },
//   {
//     url: "/dashboard/change-password",
//     pageTitle: "Change Password",
//     icon: icons?.settings,
//     access: ["user", "admin", "super_admin"],
//   },
// ];
