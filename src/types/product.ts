//lo que devuelve el servidor
export interface Product {
  id: string;
  activo: boolean;
  brand?: string;
  categoryId: string;
  cost: number;
  createdAt: string;
  description?: string;
  endDate?: string;
  isOfferActive: boolean;
  nameProd: string;
  price: number;
  proceOffer?: number;
  sku?: string;
  slug?: string;
  updatedAt: string;
  startDate?: string;
  product_images?: ProductImage[];
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  position: number;
  createdAt: string;
  updatedAt: string;
}
//lo validacion de campos del formulario
import { z } from "zod";

export const productFormSchema = z.object({
  sku: z.string().optional(),
  nameProd: z.string().min(1, "El nombre del producto es obligatorio"),
  //slug: z.string().optional(),
  price: z.string().min(1, "El precio es obligatorio"),
  cost: z.string().min(1, "El costo es obligatorio"),
  description: z.string().optional(),
  activo: z.boolean(),
  brand: z.string().optional(),
  categoryId: z.string().min(1, "La categoría es obligatoria"),
  images: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Debes subir al menos una imagen"),
});

export type ProductFormInput = z.infer<typeof productFormSchema>;

//lo que se envia al servicio
export interface productInputService {
  sku?: string;
  nameProd: string;
  slug?: string;
  price: number;
  cost: number;
  description?: string;
  activo: boolean;
  brand?: string;
  categoryId: string;
  images: File[];
}
