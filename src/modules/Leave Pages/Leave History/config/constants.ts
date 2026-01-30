export const headerForUser = [
  "ID",
  "Name",
  "Department",
  "Branch",
  "Type",
  "Reason",
  "Details",
  "Start Date",
  "End Date",
  "Leave Days",
  "Created Date",
  "Status",
  "Action",
  "Action",
  "Modal",
];
export const tableLayout = [
  "item?.id",
  "item?.user?.name",
  "item?.user?.department?.name",
  "item?.user?.branch?.name",
  "item?.type",
  "item?.reason",
  "item?.details",
  "item?.startDate?.slice(0,10)",
  "item?.endDate?.slice(0,10)",
  `item?.leaveDays > 0 ? item?.leaveDays + " days" : "day"`,
  "item?.createdAt?.slice(0,10)",
  "item?.status",
];

export const keys = ["searchTerm"];
