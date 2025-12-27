import { z } from "zod";

export const ventaSchema = z
  .object({
    totalReal: z.number({ message: "Campo requerido" }).min(0),
    totalCobrado: z.number().min(0),
    hayDeuda: z.boolean(),
    montoRecibido: z.number().optional(),
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
    }
  );

export type VentaForm = z.infer<typeof ventaSchema>;
