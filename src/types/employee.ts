//tipado con typescript
type job =
  | "CEO"
  | "GERENTE DE SUCURSAL"
  | "ALMACEN"
  | "SEGURIDAD"
  | "SOPORTE ALMACEN";

export type Employee = {
  id: string;
  name: string;
  cedula?: string;
  address?: string;
  phone?: string;
  birthDate?: Date; // La fecha viene como string del backend
  job: job;
  // Si incluyes la relación 'branch' en el servicio:
  branch: { name: string } | null;
};

//tipado con zod para validacion de datos
import { z } from "zod";

const Jobs = [
  "CEO",
  "GERENTE DE SUCURSAL",
  "ALMACEN",
  "SEGURIDAD",
  "SOPORTE ALMACEN",
] as const;

export const EmployeeSchema = z.object({
  name: z
    .string()
    .nonempty("campo requerido")
    .min(3, "El nombre debe tener mas de 3 letras"),
  cedula: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  birthDate: z
    .date()
    .max(new Date(), "La fecha no puede ser en el futuro")
    .optional(),
  job: z.enum(Jobs, {
    message: "El rol es obligatorio y debe ser seleccionado.",
  }),
  branchId: z.string().nonempty("La sucursal es obligatoria."),
});

export type FormEmployeeInput = z.infer<typeof EmployeeSchema>;
