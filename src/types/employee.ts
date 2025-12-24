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
  // Si incluyes la relación 'branches' en el servicio:
  branchId?: string;
  branchName?: { branchName: string } | null;
};
/* 
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
 */

import { z } from "zod";

const Jobs = [
  "CEO",
  "GERENTE DE SUCURSAL",
  "ALMACEN",
  "SEGURIDAD",
  "SOPORTE ALMACEN",
] as const;

// Definimos los roles de sistema (para la tabla users)
const SystemRoles = ["ADMIN", "SELLER", "INVENTORY"] as const;

export const EmployeeSchema = z
  .object({
    name: z
      .string()
      .min(1, "Campo requerido")
      .min(3, "El nombre debe tener más de 3 letras"),
    cedula: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    birthDate: z
      .date()
      .max(new Date(), "La fecha no puede ser en el futuro")
      .optional(),
    job: z.enum(Jobs, { message: "El cargo es obligatorio" }),
    branchId: z.string().min(1, "La sucursal es obligatoria."),

    // --- NUEVOS CAMPOS PARA EL ACCESO ---

    // El "Switch"
    hasSystemAccess: z.boolean(),

    // Campos de usuario (inicialmente opcionales o vacíos)
    email: z.string().optional(),
    password: z.string().optional(),
    systemRole: z.enum(SystemRoles).optional(),
  })
  .superRefine((data, ctx) => {
    // Aquí ocurre la MAGIA de la validación condicional
    if (data.hasSystemAccess) {
      // 1. Validar Email
      if (!data.email || !z.email().safeParse(data.email).success) {
        ctx.addIssue({
          code: "custom",
          message: "Campo requerido",
          path: ["email"], // Esto marca el error en el input de email
        });
      }

      // 2. Validar Password (solo si estamos creando, quizás en edición sea opcional)
      if (!data.password || data.password.length < 6) {
        ctx.addIssue({
          code: "custom",
          message: "Campo requerido (mínimo 6 caracteres).",
          path: ["password"],
        });
      }

      // 3. Validar Rol de Sistema
      if (!data.systemRole) {
        ctx.addIssue({
          code: "custom",
          message: "Debes asignar un rol de sistema.",
          path: ["systemRole"],
        });
      }
    }
  });

export type FormEmployeeInput = z.infer<typeof EmployeeSchema>;
