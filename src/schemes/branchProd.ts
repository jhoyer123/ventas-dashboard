import { z } from "zod";
//schema para agregar o crear un producto en sucursales
export const branchStockSchema = z.object({
  branches: z
    .array(
      z.object({
        branchId: z.string(),
        branchName: z.string(),
        selected: z.boolean(),
        stock: z
          .number({ message: "El stock debe ser un número mayor o igual a 0" })
          .min(0, "El stock no puede ser negativo"),
      })
    )
    .refine((data) => data.some((b) => b.selected), {
      message: "Debes seleccionar al menos una sucursal",
    }),
});
//el type inferido de branchStockSchema
export type BranchStockFormValues = z.infer<typeof branchStockSchema>;

//schema para agregar stock a sucursal
export const addStockSchema = z.object({
  quantity: z
    .number({ message: "La cantidad debe ser un número mayor a 0" })
    .int("La cantidad debe ser un número entero")
    .min(1, "La cantidad no puede ser negativa ni 0"),
});

//el type inferido de addStockSchema
export type AddStockFormValues = z.infer<typeof addStockSchema>;

//schema para quitar stock a sucursal
export const removeStockSchema = z
  .object({
    quantity: z.coerce
      .number({ message: "La cantidad debe ser un número mayor a 0" })
      .int("La cantidad debe ser un número entero")
      .min(1, "La cantidad debe ser mayor a 0"),

    reason: z
      .string({ message: "El motivo es obligatorio" })
      .min(5, "El motivo debe tener al menos 5 caracteres"),

    stockCurrent: z.number(),
  })
  .refine((data) => data.quantity <= data.stockCurrent, {
    message: "La cantidad a quitar no puede ser mayor al stock actual",
    path: ["quantity"], //el error se muestra en quantity
  });

export type RemoveStockValues = z.infer<typeof removeStockSchema>;

//schema para transferir stock entre sucursales
export const transferStockSchema = z
  .object({
    destinationBranchId: z
      .string({ message: "Debes seleccionar una sucursal destino" })
      .min(1, "Debes seleccionar una sucursal destino"),

    quantity: z.coerce
      .number({ message: "La cantidad debe ser un número mayor a 0" })
      .int("La cantidad debe ser un número entero")
      .min(1, "La cantidad debe ser mayor a 0"),

    stockCurrent: z.number(),
  })
  .refine((data) => data.quantity <= data.stockCurrent, {
    message: "La cantidad a transferir no puede ser mayor al stock actual",
    path: ["quantity"],
  });

export type TransferStockValues = z.infer<typeof transferStockSchema>;
