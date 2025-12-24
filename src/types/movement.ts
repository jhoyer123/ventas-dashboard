//type de como llegan los movimientos desde el backend
export interface Movement {
  branch_from_name: string | null;
  branch_to_name: string | null;
  created_at: Date;
  description: string | null;
  employee_name: string;
  id: string;
  movedQuantity: number;
  type: "INCOMING" | "OUTGOING" | "TRANSFER" | "ADJUST";
  name_prod: string;
}
