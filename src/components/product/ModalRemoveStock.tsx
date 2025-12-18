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
//import de para el form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import types y schema
import {
  removeStockSchema,
  type RemoveStockValues,
} from "@/schemes/branchProd";
import { FormInput } from "../common/Form/FormInput";
import { Label } from "@radix-ui/react-dropdown-menu";

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
  stockCurrent: number;
  onRemoveStock: (data: RemoveStockValues) => void;
}

export function ModalRemoveStock({
  isOpen,
  setIsOpen,
  stockCurrent,
  onRemoveStock,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(removeStockSchema),
    defaultValues: {
      quantity: 1,
      reason: "",
      stockCurrent,
    },
  });

  const onSubmit = (data: RemoveStockValues) => {
    console.log("Datos validados:", data);
    onRemoveStock(data);
    setIsOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Quitar stock</DialogTitle>
          <DialogDescription>
            Indique la cantidad de stock a quitar de la sucursal actual y el
            motivo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Cantidad */}
          <FormInput
            label="Cantidad a quitar"
            name="quantity"
            register={register}
            errors={errors}
            inputProps={{
              type: "number",
            }}
          />

          {/* Motivo */}
          <div className="grid gap-1">
            <Label className="font-semibold text-sm">Motivo</Label>
            <textarea
              {...register("reason")}
              rows={4}
              className="w-full rounded-md border px-3 py-2 resize-none size-30"
            />
            {errors.reason && (
              <p className="text-sm text-red-500">{errors.reason.message}</p>
            )}
          </div>

          <DialogFooter className="flex justify-between">
            <div className="flex justify-between w-full">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Guardar</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
