export const headerData = [
  "ID",
  "Department Name",
  "Branch",
  "Supervisor's Name",
  "Total Employees",
  "Created Date",
  "Delete",
  "Edit",
];
export const dataLayout = [
  "item?.id",
  "item?.name",
  "item?.branch?.name",
  "item?.supervisor?.name",
  "item?._count?.users",
  "item?.createdAt?.slice(0,10)",
];
export const keys = ["searchTerm"];
