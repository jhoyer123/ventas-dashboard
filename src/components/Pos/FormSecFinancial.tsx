import { useFormContext } from "react-hook-form";
import { FormInput } from "../common/Form/FormInput";
import type { SaleFormValues } from "@/schemes/saleExecute";
import { useEffect } from "react";

//trabajamos la seccion financiera del formulario de venta con el formcontext proveido por
//react-hook-form
export function FormSecFinancial() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<SaleFormValues>();
  //observamos los valores necesarios
  const hayDeuda = watch("hayDeuda");
  const totalCobrado = watch("totalCobrado");
  const totalReal = watch("totalReal");
  // efecto para limpiar monto recibido si no hay deuda
  useEffect(() => {
    if (!hayDeuda) {
      setValue("montoRecibido", undefined);
    }
  }, [hayDeuda, setValue]);

  return (
    <section className="space-y-2 border rounded-lg p-2">
      <h3 className="font-semibold">Datos financieros</h3>

      <div
        className="flex flex-col gap-3 w-full justify-between items-center
      md:flex-row "
      >
        {/* Total real */}
        <div className="text-center w-full flex gap-2 items-center justify-center bg-input rounded-xl p-2
        sm:w-1/2">
          <span className="font-title text-xl">Total:</span>
          <span className="font-title text-xl">Bs. {totalReal}</span>
        </div>

        {/* Checkbox deuda */}
        <label className="flex gap-2">
          <input type="checkbox" {...register("hayDeuda")} />
          ¿Habrá deuda / crédito?
        </label>
      </div>

      <div className="grid grid-cols-1
      sm:grid-cols-2 justify-between items-center gap-5 w-full
      sm:flex-row">
        {/* Total cobrado */}
        <FormInput
          label="Total cobrado"
          name="totalCobrado"
          register={register}
          errors={errors}
          inputProps={{
            type: "number",
            placeholder: `Sugerido: ${totalReal}`,
            step: "0.01",
          }}
        />

        {/* Monto recibido */}
        {hayDeuda && (
          <FormInput
            label="Monto recibido"
            name="montoRecibido"
            register={register}
            errors={errors}
            inputProps={{
              type: "number",
              placeholder: `Recibido de ${
                totalCobrado || Number(totalReal).toFixed(2)
              }`,
              step: "0.01",
            }}
          />
        )}
      </div>
    </section>
  );
}
