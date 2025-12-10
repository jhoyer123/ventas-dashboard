export interface Permissions {
  [role: string]: string[];
}

export const permissions: Permissions = {
  SUPERADMIN: ["Empleados", "Models" , "Documentation", "Settings"],
  ADMIN: ["VIEW_DASHBOARD", "VIEW_REPORTS"],
  SELLER: ["VIEW_DASHBOARD"],
  INVENTORY: ["VIEW_DASHBOARD", "MANAGE_INVENTORY"],
};
