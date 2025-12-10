export type Role = "SUPERADMIN" | "ADMIN" | "SELLER" | "INVENTORY";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  branchId?: string;
  avatar?: string;
}
