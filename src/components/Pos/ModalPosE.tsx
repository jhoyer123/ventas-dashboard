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

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//types para el pos y la venta
import type { CartItem, Totals } from "@/types/salePos";
import { saleFormSchema, type SaleFormValues } from "@/schemes/saleExecute";
import { FormSecFinancial } from "./FormSecFinancial";
import { FormSecStateSale } from "./FormSecStateSale";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  carts: CartItem[];
  totals: Totals;
  executeSale: (cart: CartItem[], data: SaleFormValues) => void;
}

export function ModalPosE({
  isOpen,
  setIsOpen,
  carts,
  totals,
  executeSale,
}: Props) {
  const methods = useForm<SaleFormValues>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      name: "",
      idNit: "",
      paymentMethod: undefined,
      status: undefined,
      isGeneric: false,
      totalReal: Number(totals.calculatedTotal.toFixed(2)),
      totalCobrado: Number(totals.calculatedTotal.toFixed(2)),
      hayDeuda: false,
    },
  });

  const isGeneric = methods.watch("isGeneric");

  // sincroniza venta rápida
  useEffect(() => {
    if (isGeneric) {
      methods.setValue("name", "S/N");
      methods.setValue("idNit", "0");
    } else {
      methods.setValue("name", "");
      methods.setValue("idNit", "");
    }
  }, [isGeneric, methods.setValue]);

  //setea los totales cuando cambian
  useEffect(() => {
    methods.setValue("totalReal", Number(totals.calculatedTotal.toFixed(2)));
    methods.setValue("totalCobrado", Number(totals.calculatedTotal.toFixed(2)));
  }, [totals.calculatedTotal]);

  useEffect(() => {
    if (carts.length === 0) {
      methods.reset();
    }
  }, [carts]);

  const onSubmit = (data: SaleFormValues) => {
    console.log("Datos de la venta:", data);
    executeSale(carts, data);
    setIsOpen(false);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="px-1 bg-card text-card-foreground max-h-[90vh] flex flex-col overflow-hidden gap-1
          sm:max-w-[520px] sm:px-4
          md:max-w-[720px]"
        >
          <DialogHeader className="shrink-0">
            <DialogTitle className="text-2xl font-bold">
              Procesar Pago
            </DialogTitle>
            <DialogDescription>
              Confirma los datos para cerrar la venta.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex flex-col flex-1"
          >
            <div className="max-h-[calc(90vh-200px)] overflow-y-auto flex flex-col gap-2 py-3">
              {/* seccion financiera */}
              <FormSecFinancial />
              {/* seccion datos cliente */}
              <FormSecStateSale isGeneric={isGeneric} />
            </div>
            <DialogFooter className="mt-3 shrink-0">
              <div
                className="flex flex-col justify-between items-center w-full gap-2
              sm:flex-row "
              >
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    type="button"
                    className="bg-ring cursor-pointer w-full
                  sm:w-auto"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-chart-3 w-full hover:bg-blue-700 text-white cursor-pointer
                  sm:w-auto"
                >
                  Confirmar y Cobrar
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
