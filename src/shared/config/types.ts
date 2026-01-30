export type Branch = {
  id: number;
  name: string;
  address: string;
  createdAt: string;
  updatedAt: string;
};

export type Department = {
  id: number;
  name: string;
  branchId: number;
  supervisorId: number | null;
  createdAt: string;
  updatedAt: string;
  supervisor: User | null;
};

export type Power = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type UserRole = "super_admin" | "admin" | "user" | "employee"; // Adjust as needed

export type User = {
  id: number;
  name: string;
  email: string;
  contactNo: string;
  bloodGroup: string;
  designation: string;
  hireDate: string;
  profileImage: string;
  verified: boolean;
  branchId: number;
  departmentId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  branch: Branch;
  department: Department;
  powers: Power[];
  user: {
    id: number;
    role: UserRole;
  };
};
