//tipado con ts
export interface CategoryType {
  id: string;
  nameCat: string;
  description: string;
  parentId?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  //campo generado con consulta sql
  total_products?: number;
}

//Esto es con zod para cuando enviamos los datos a la db
import { z } from "zod";

export const categorySchema = z.object({
  nameCat: z.string().nonempty("El campo es requerido"),
  parentId: z.string().optional(),
  description: z.string().optional(),
});

export type categoryInput = z.infer<typeof categorySchema>;
