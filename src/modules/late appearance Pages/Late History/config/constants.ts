export const headerForUser = [
  "ID",
  "Name",
  "Department",
  "Branch",
  "Designation",
  "office Time",
  "In Time",
  "Reason",
  "Late Date",
  "Created Date",
  "Updated Date",
  "Action",
  "Delete",
  "Edit",
];
export const tableLayout = [
  "item?.id",
  "item?.user?.name",
  "item?.user?.department?.name",
  "item?.user?.branch?.name",
  "item?.user?.designation",
  "`${String(item?.officeHour)?.padStart(2, '0')}:${String(item?.officeMinute).padStart(2, '0')}`",
  "`${String(item?.hoursLate)?.padStart(2,'0')}:${String(item?.minutesLate).padStart(2, '0')}`",
  "item?.reason",
  "item?.date?.slice(0,10)",
  "item?.createdAt?.slice(0,10)",
  "item?.updatedAt?.slice(0,10)",
];

export const keys = ["searchTerm"];
