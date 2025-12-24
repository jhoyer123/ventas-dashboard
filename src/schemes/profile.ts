import { z } from "zod";

export const passwordSchema = z
  .object({
    currentPassword: z
      .string({ message: "Campo requerido" })
      .min(1, "Campo requerido"),
    newPassword: z
      .string({ message: "Campo requerido" })
      .min(8, "Mínimo 8 caracteres")
      .nonempty({ message: "Campo requerido" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type PasswordChange = z.infer<typeof passwordSchema>;
