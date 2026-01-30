// src/pages/users/create/config/constants.ts

export const roleOptions = [
  { value: "ADMIN", label: "Admin" },
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "EMPLOYEE", label: "Employee" },
  { value: "HR", label: "HR" },
  { value: "INCHARGE", label: "Incharge" },
  { value: "MANAGER", label: "Manager" },
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

export const genderOptions = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "OTHER", label: "Other" },
];

export const initialData = {
  name: "",
  email: "",
  password: "",
  contactNo: "",
  designation: "",
  address: "",
  employeeId: "",
  gender: "",
  roasters: [] as string[],
};

export const inputs = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "employeeId", label: "Employee ID", type: "text" },
  { name: "contactNo", label: "Phone Number", type: "text" },
  { name: "designation", label: "Designation", type: "text" },
  { name: "address", label: "Address", type: "text" },
];
