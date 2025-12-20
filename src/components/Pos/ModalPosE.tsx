import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { CartItem, Totals } from "@/pages/sale/Sale";
import { saleFormSchema, type SaleFormValues } from "@/schemes/saleExecute";
import { FormSelect } from "../common/Form/FormSelect";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  carts: CartItem[];
  totals: Totals;
  executeSale: (cart: CartItem[], totals: Totals, data: SaleFormValues) => void;
  manualMount: number | "";
}

export function ModalPosE({
  isOpen,
  setIsOpen,
  carts,
  totals,
  executeSale,
  manualMount,
}: Props) {
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SaleFormValues>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      name: "",
      idNit: "",
      paymentMethod: undefined,
      status: undefined,
      isGeneric: false,
    },
  });

  const isGeneric = watch("isGeneric");

  // sincroniza venta rápida
  useEffect(() => {
    if (isGeneric) {
      setValue("name", "S/N");
      setValue("idNit", "0");
    } else {
      setValue("name", "");
      setValue("idNit", "");
    }
  }, [isGeneric, setValue]);

  const onSubmit = (data: SaleFormValues) => {
    executeSale(carts, totals, data);
    setIsOpen(false);
    reset();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      reset({ paymentMethod: undefined, status: undefined }); // ← LIMPIA TODO
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[520px] p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="mb-5">
            <DialogTitle className="text-2xl font-bold">
              Procesar Pago
            </DialogTitle>
            <DialogDescription>
              Confirma los datos para cerrar la venta.
            </DialogDescription>
          </DialogHeader>

          {/* TOTAL */}
          <div className="bg-slate-50 border rounded-lg p-6 mb-6 text-center">
            <span className="text-sm font-semibold text-slate-500 uppercase">
              Total Pagado
            </span>
            <div className="text-5xl font-extrabold mt-2">
              {(manualMount === ""
                ? totals.finalAmount
                : Number(manualMount)
              ).toFixed(2)}
            </div>
          </div>

          <div className="grid gap-6">
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
                  <Label className="cursor-pointer">
                    Venta rápida / Sin datos
                  </Label>
                </div>
              )}
            />

            {/* DATOS CLIENTE */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 grid gap-2">
                <Label>NIT / CI</Label>
                <Controller
                  name="idNit"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      disabled={isGeneric}
                      className="font-mono"
                    />
                  )}
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
                  render={({ field }) => (
                    <Input {...field} disabled={isGeneric} />
                  )}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
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
          </div>

          <DialogFooter className="mt-8">
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              size="lg"
              className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Confirmar y Cobrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
