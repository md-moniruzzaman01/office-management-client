export const headerForUser = [
  "ID",
  "Image",
  "Name",
  "Email",
  "Branch",
  "Designation",
  "Department",
  "User Role",
  "Blood Group",
  "Created Date",
  "Delete",
  "View",
  "Edit",
];
export const tableLayout = [
  "item?.userId",
  `item?.profileImage`,
  "item?.name",
  "item?.email",
  "item?.branch?.name",
  "item?.designation",
  "item?.department?.name",
  "item?.user?.role",
  "item?.bloodGroup",
  "item?.createdAt?.slice(0,10)",
];

export const keys = ["searchTerm", "role"];

export const btnValues = [
  { label: "Super Admin", value: "super_admin" },
  { label: "Admin", value: "admin" },
  { label: "Employee", value: "employee" },
];
