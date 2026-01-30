export const inputs = [
  {
    label: "Event Name",
    id: "name",
    disabled: false,
    type: "text",
    name: "name",
    placeholder: "Event Name",
  },
  {
    label: "Description",
    id: "description",
    disabled: false,
    type: "text",
    name: "description",
    placeholder: "Description",
  },
  {
    label: "Start Date",
    id: "startDate",
    disabled: false,
    type: "date",
    name: "startDate",
    placeholder: "Start Date",
  },
  {
    label: "End Date",
    id: "endDate",
    disabled: false,
    type: "date",
    name: "endDate",
    placeholder: "End Date",
  },
];

export const initialData = {
  name: "",
  description: "",
  startDate: "",
  endDate: "",
};
