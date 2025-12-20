import { z } from "zod";

export const saleFormSchema = z
  .object({
    name: z.string({ message: "Nombre requerido" }).min(1, "Nombre requerido"),
    idNit: z
      .string({ message: "NIT / CI requerido" })
      .min(1, "NIT / CI requerido"),
    paymentMethod: z.enum(["CASH", "CARD", "QR", "TRANSFER"], {
      message: "Metodo de pago requerido",
    }),
    status: z.enum(["PENDING", "COMPLETED", "CANCELED"], {
      message: "Estado de la venta requerido",
    }),
    isGeneric: z.boolean(),
  })
  .superRefine((data) => {
    if (data.isGeneric) {
      data.name = "S/N";
      data.idNit = "0";
    }
  });

export type SaleFormValues = z.infer<typeof saleFormSchema>;
