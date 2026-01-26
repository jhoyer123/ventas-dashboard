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
    //datos financieros
    totalReal: z.number({ message: "Campo requerido" }).min(0),
    totalCobrado: z
      .number({ message: "Campo requerido" })
      .min(1, { message: "El total cobrado debe ser mayor a 0" }),
    hayDeuda: z.boolean(),
    montoRecibido: z.number({ message: "Campo requerido" }).optional(),
  })
  .refine(
    (data) => {
      if (data.hayDeuda) {
        return (
          data.montoRecibido !== undefined &&
          data.montoRecibido < data.totalCobrado
        );
      }
      return true;
    },
    {
      message: "El monto recibido debe ser menor al total cobrado",
      path: ["montoRecibido"],
    },
  )
  .refine(
    (data) => {
      if (data.totalCobrado > data.totalReal) return false;
      return true;
    },
    {
      message: "El total cobrado no puede ser mayor al total real",
      path: ["totalCobrado"],
    },
  )
  .superRefine((data) => {
    if (data.isGeneric) {
      data.name = "S/N";
      data.idNit = "0";
    }
  });

export type SaleFormValues = z.infer<typeof saleFormSchema>;
