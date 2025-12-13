//tipado con ts
export interface categoryType {
  id: string;
  nameCat: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

//Esto es con zod para cuando enviamos los datos a la db
import { z } from "zod";

export const categorySchema = z.object({
  nameCat: z.string().nonempty("El campo es requerido"),
  parentId: z.string().optional(),
});

export type categoryInput = z.infer<typeof categorySchema>;
