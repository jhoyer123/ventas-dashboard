export type Employee = {
  id: string;
  name: string;
  cedula: string;
  address: string;
  phone: string;
  birthDate: string; // La fecha viene como string del backend
  position: string;
  // Si incluyes la relación 'branch' en el servicio:
  branch: { name: string } | null;
};
