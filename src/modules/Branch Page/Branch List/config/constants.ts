export const headerData = [
  "ID",
  "Branch",
  "Address",
  "Total Department",
  "Total Employees",
  "Delete",
  "Edit",
];
export const dataLayout = [
  "item?.id",
  "item?.name",
  "item?.address",
  "item?._count?.departments",
  "item?._count?.users",
];
export const keys = ["searchTerm"];
