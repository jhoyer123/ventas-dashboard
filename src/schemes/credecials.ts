import { z } from "zod";
export const resetCredentialsSchema = z
  .object({
    email: z.email("Email inválido"),
    resetPassword: z.boolean(),
    password: z.string().min(8, "Mínimo 8 caracteres").optional(),
  })
  .refine((data) => !data.resetPassword || !!data.password, {
    message: "El password es obligatorio si se va a resetear",
    path: ["password"],
  });

export type ResetCredentialsForm = z.infer<typeof resetCredentialsSchema>;
