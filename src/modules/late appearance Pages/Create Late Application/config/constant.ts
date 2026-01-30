export const inputs = [
  {
    label: "Reason",
    disabled: false,
    id: "reason",
    type: "text",
    name: "reason",
    placeholder: "Write here...",
    default: "",
  },
  {
    label: "Office Time",
    disabled: false,
    id: "officeTime",
    type: "time",
    name: "officeTime",
    placeholder: "Write here...",
    default: "",
  },
  {
    label: "Office In Time",
    disabled: false,
    id: "time",
    type: "time",
    name: "time",
    placeholder: "Write here...",
    default: "",
  },
];

export const initialData = {
  reason: "",
  time: "",
  date: "",
  officeTime: "10:00",
};
