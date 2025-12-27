import { Controller, useFormContext } from "react-hook-form";
import type { SaleFormValues } from "@/schemes/saleExecute";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { FormSelect } from "../common/Form/FormSelect";

export const FormSecStateSale = ({ isGeneric }: { isGeneric: boolean }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<SaleFormValues>();

  return (
    <section className="grid gap-2 border rounded-lg p-2">
      <h3 className="font-semibold">Datos del cliente</h3>
      {/* VENTA RÁPIDA */}
      <Controller
        name="isGeneric"
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-3 p-4 border rounded-md bg-slate-50">
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="h-5 w-5"
            />
            <Label className="cursor-pointer">Venta rápida / Sin datos</Label>
          </div>
        )}
      />

      {/* DATOS CLIENTE */}
      <div
        className="grid grid-cols-1 gap-4
      sm:grid-cols-3"
      >
        <div className="col-span-1 grid gap-2">
          <Label>NIT / CI</Label>
          <Controller
            name="idNit"
            control={control}
            render={({ field }) => <Input {...field} disabled={isGeneric} />}
          />
          {errors.idNit && (
            <p className="text-red-600 text-sm">{errors.idNit.message}</p>
          )}
        </div>

        <div className="col-span-2 grid gap-2">
          <Label>Nombre Cliente</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} disabled={isGeneric} />}
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>
      </div>

      <div
        className="grid grid-cols-1  gap-4
      sm:grid-cols-2"
      >
        {/* SELECTS */}
        <FormSelect
          control={control}
          label="Metodo de pago"
          name="paymentMethod"
          errors={errors}
          placeholder="Seleccione un metodo de pago"
          options={[
            { value: "CASH", label: "Efectivo" },
            { value: "CARD", label: "Tarjeta" },
            { value: "TRANSFER", label: "Transferencia" },
            { value: "QR", label: "Código QR" },
          ]}
        />

        {/* ESTADO */}
        <FormSelect
          control={control}
          label="Estado de la Venta"
          name="status"
          errors={errors}
          placeholder="Seleccione el estado"
          options={[
            { value: "PENDING", label: "Pendiente" },
            { value: "COMPLETED", label: "Completada" },
          ]}
        />
      </div>
    </section>
  );
};
