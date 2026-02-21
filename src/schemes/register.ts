import z from "zod";

export const registerSchema = z
  .object({
    name_organization: z.string().min(1, "Este campo es requerido"),
    full_name: z.string().min(1, "Este campo es requerido"),
    phone: z.string().min(1, "Este campo es requerido"),
    email: z.string().email("Ingresa un email válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .max(100, "La contraseña no puede exceder los 100 caracteres"),
    confirmPassword: z.string().min(1, "Este campo es requerido"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
