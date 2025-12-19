//lo validacion de campos del formulario
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB en bytes
const MAX_FILES = 10;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

//schema de creacion del producto
export const productFormSchema = z
  .object({
    sku: z.string().optional(),
    nameProd: z.string().min(1, "El nombre del producto es obligatorio"),
    slug: z.string().optional(),
    price: z.coerce
      .number({ message: "El precio es obligatorio" })
      .min(0.01, "El precio debe ser mayor a 0"),
    cost: z.coerce
      .number({ message: "El costo es obligatorio" })
      .min(0.01, "El costo debe ser mayor a 0"),
    description: z
      .string({ message: "La descripción es obligatoria" })
      .min(1, "La descripción es obligatoria"),
    brand: z.string().optional(),
    categoryId: z
      .string({ message: "La categoría es obligatoria" })
      .nonempty("La categoría es obligatoria")
      .min(1, "La categoría es obligatoria"),
    images: z
      .instanceof(FileList, {
        message: "Debes seleccionar al menos una imagen",
      })
      .refine((files) => files.length > 0, {
        message: "Se requiere al menos una imagen",
      })
      .refine((files) => files.length <= MAX_FILES, {
        message: `Máximo ${MAX_FILES} imágenes permitidas`,
      })
      .refine(
        (files) =>
          Array.from(files).every((file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type)
          ),
        {
          message: "Solo se permiten imágenes (JPG, PNG, WebP)",
        }
      )
      //Validar que NINGÚN archivo exceda el tamaño máximo
      .refine(
        (files) =>
          Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
        {
          message: `Cada imagen debe pesar menos de ${
            MAX_FILE_SIZE / (1024 * 1024)
          }MB`,
        }
      ),
  })
  .refine((data) => data.cost <= data.price, {
    message: "El costo no puede ser mayor al precio de venta",
    path: ["cost"], // 👈 Esto asegura que el error se asocie al campo 'cost'
  });

//type para el formulario en modo creacion
export type ProductFormInput = z.infer<typeof productFormSchema>;

// Este es el tipo que usaremos para pasar los datos YA LIMPIOS al servicio.
export type ProductInputService = Omit<ProductFormInput, "images"> & {
  images: File[]; // <--- Sobreescribimos FileList a File[]
};

//schemma de actualizacion
export const productFormSchemaUpdate = z
  .object({
    sku: z.string().optional(),
    nameProd: z.string().min(1, "El nombre del producto es obligatorio"),
    slug: z.string().optional(),

    price: z
      .number({ message: "El precio es obligatorio" })
      .min(0.01, "El precio debe ser mayor a 0"),

    cost: z
      .number({ message: "El costo es obligatorio" })
      .min(0.01, "El costo debe ser mayor a 0"),

    description: z
      .string({ message: "La descripción es obligatoria" })
      .min(1, "La descripción es obligatoria"),

    brand: z.string().optional(),

    categoryId: z
      .string({ message: "La categoría es obligatoria" })
      .min(1, "La categoría es obligatoria"),

    // nuevas imágenes
    images: z
      .instanceof(FileList)
      .nullable()
      .optional()
      .refine((files) => !files || files.length <= MAX_FILES, {
        message: `Máximo ${MAX_FILES} imágenes permitidas`,
      })
      .refine(
        (files) =>
          !files ||
          Array.from(files).every((file) =>
            ACCEPTED_IMAGE_TYPES.includes(file.type)
          ),
        { message: "Solo se permiten imágenes (JPG, PNG, WebP)" }
      )
      .refine(
        (files) =>
          !files ||
          Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
        {
          message: `Cada imagen debe pesar menos de ${
            MAX_FILE_SIZE / (1024 * 1024)
          }MB`,
        }
      ),

    // imágenes existentes (URLs)
    imageExisting: z.array(z.string()).optional(),
    // imágenes a eliminar (URLs)
    imageToDelete: z.array(z.string()).optional(),
  })
  //validar que el costo no sea mayor al precio
  .refine((data) => data.cost <= data.price, {
    message: "El costo no puede ser mayor al precio de venta",
    path: ["cost"], // 👈 Esto asegura que el error se asocie al campo 'cost'
  })
  //VALIDACIÓN GLOBAL (AQUÍ ESTÁ LA CLAVE)
  .superRefine((data, ctx) => {
    const newCount = data.images?.length ?? 0;
    const existingCount = data.imageExisting?.length ?? 0;
    const total = newCount + existingCount;

    //no puede quedar en 0
    if (total === 0) {
      ctx.addIssue({
        path: ["images"],
        message: "Debes tener al menos una imagen",
        code: "custom",
      });
    }

    //no puede exceder el máximo
    if (total > MAX_FILES) {
      ctx.addIssue({
        path: ["images"],
        message: `El total de imágenes no puede superar ${MAX_FILES}`,
        code: "custom",
      });
    }
  });
