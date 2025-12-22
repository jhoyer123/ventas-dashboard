// Definición de tipos para los datos de entrada
export interface BranchInput {
  branch_name: string;
  address: string;
  code: string;
}

//type para el hook update
export interface updateType {
  id: string;
  dataBranch: BranchInput;
  code: string;
}

// Definición de tipos para el resultado de la sucursal
export interface BranchOutput {
  id: string; // uuid
  branch_name: string; // DB: branchName
  address: string; // DB: address
  created_at: Date; // DB: createdAt
  updated_at: Date; // DB: updatedAt
  code: string; // DB: code
  // Campos "simulados" o calculados para que el dashboard se vea completo
  total_employees?: number;
  total_products?: number;
}
