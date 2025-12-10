type job =
  | "CEO"
  | "GERENTE DE SUCURSAL"
  | "ALMACEN"
  | "SEGURIDAD"
  | "SOPORTE ALMACEN";

export type Employee = {
  id: string;
  name: string;
  cedula: string;
  address: string;
  phone: string;
  birthDate: string; // La fecha viene como string del backend
  job: job;
  // Si incluyes la relación 'branch' en el servicio:
  branch: { name: string } | null;
};
