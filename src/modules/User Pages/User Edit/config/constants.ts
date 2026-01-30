export const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "super_admin", label: "Super Admin" },
  { value: "employee", label: "Employee" },
  { value: "hr", label: "HR" },
];

export const bloodGroupOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
];

export const initialData = {
  name: "",
  email: "",
  contactNo: "",
  designation: "",
  profileImage: "",
};

export const inputs = [
  {
    name: "name",
    placeholder: "Name",
    type: "text",
    label: "Name",
  },
  {
    name: "email",
    placeholder: "Email",
    type: "email",
    label: "Email",
  },

  {
    name: "contactNo",
    placeholder: "Phone Number",
    type: "text",
    label: "Phone Number",
  },

  {
    name: "designation",
    placeholder: "Designation",
    type: "text",
    label: "Designation",
  },
];
