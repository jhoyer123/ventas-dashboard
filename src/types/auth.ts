export type Role = "SUPERADMIN" | "ADMIN" | "SELLER" | "INVENTORY";

export interface UserAuth {
  id: string;
  email: string;
  role: Role;
  forcePasswordChange: boolean;
  employeeId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  branchId?: string;
  avatar?: string;
  phone?: string;
}

//type para el cambio de password
export interface PasswordChange {
  email: string;
  currentPassword: string;
  newPassword: string;
}
