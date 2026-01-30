import HolidayCreate from "../../modules/Holiday Page/Holiday Create/HolidayCreate";
import HolidayEdit from "../../modules/Holiday Page/Holiday Edit/HolidayEdit";
import HolidayList from "../../modules/Holiday Page/Holidays List/HolidayList";

export const holidayRoutes = [
  {
    path: "/holidays",
    element: <HolidayList />,
  },
  {
    path: "/holidays/holiday-create",
    element: <HolidayCreate />,
  },
  {
    path: "/holidays/holiday-edit/:id",
    element: <HolidayEdit />,
  },
];
