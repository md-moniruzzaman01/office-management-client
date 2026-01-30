export const headerData = [
  "ID",
  "Holiday Name",
  "Holiday Date",
  "Created Date",
  "Delete",
  "Edit",
];
export const dataLayout = [
  "item?.id",
  "item?.name",
  "item?.date && new Date(item?.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',  })",
  "item?.createdAt && new Date(item?.createdAt).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })",
];
