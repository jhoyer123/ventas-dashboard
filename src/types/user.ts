/* export type Role = "ADMIN" | "SELLER" | "INVENTORY";

export interface User {
  id: string;
  email: string;
  role: Role;
  forcePasswordChange: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  employeeId: string;
  auth_user_id: string;
  employee: {
    name: string;
    phone?: string;
  };
}
 */

export type Role = "ADMIN" | "SELLER" | "INVENTORY";

export interface UserSystem {
  id: string;
  email: string;
  created_at: Date;
  name: string;
  role: Role;
  forcePasswordChange: boolean;
  avatar: string | null;
}
