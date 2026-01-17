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
    executeSale(carts, data);
    setIsOpen(false);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="card-modal px-1 pb-3
          sm:max-w-[520px] sm:px-4
          md:max-w-[720px]"
        >
          <DialogHeader className="shrink-0">
            <DialogTitle className="text-xl font-bold">
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
            <div className="flex flex-col gap-2 py-2 w-full">
              {/* seccion financiera */}
              <FormSecFinancial />
              {/* seccion datos cliente */}
              <FormSecStateSale isGeneric={isGeneric} />
            </div>
            <DialogFooter className="mt-3">
              <DialogClose asChild>
                <Button variant="secondary" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="btn-create">
                Confirmar y Cobrar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
