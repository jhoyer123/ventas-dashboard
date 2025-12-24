import { z } from "zod";

//eschema para login
export const loginSchema = z.object({
  email: z.email("Este campo es requerido").nonempty("Este campo es requerido"),
  password: z
    .string({ message: "campo requerido" })
    .nonempty("Este campo es requerido"),
});

//tipado de las credenciales de login
export type loginCredentials = z.infer<typeof loginSchema>;
