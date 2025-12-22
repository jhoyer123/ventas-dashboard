import { z } from "zod";

export const debtPaymentSchema = (debt: number) =>
  z.object({
    amount: z
      .number({ message: "Debe ser un número" })
      .positive("El monto debe ser mayor a 0")
      .max(debt, "El monto no puede ser mayor a la deuda actual"),
    paymentMethod: z.enum(
      ["CASH", "CARD", "TRANSFER", "QR"],
      "Método de pago inválido"
    ),
    note: z.string().optional(),
  });

export type DebtPaymentForm = z.infer<ReturnType<typeof debtPaymentSchema>>;
