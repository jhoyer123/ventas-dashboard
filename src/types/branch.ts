// Definición de tipos para los datos de entrada
export interface BranchInput {
  branchName: string;
  address: string;
}

//type para el hook update
export interface updateType {
  id: string;
  dataBranch: BranchInput;
}

// Definición de tipos para el resultado de la sucursal (ajusta según tu esquema)
export interface BranchOutput {
  id: string; // uuid
  branchName: string; // DB: branchName
  address: string; // DB: address
  activo: boolean; // DB: activo
  createdAt: string; // DB: createdAt
  // Campos "simulados" o calculados para que el dashboard se vea completo
  empleados?: number;
  managersName?: string;
}
