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
import { addStockSchema, type AddStockFormValues } from "@/schemes/branchProd";
import { FormInput } from "../common/Form/FormInput";

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
  onAddStock: (quantity: AddStockFormValues) => void;
}

export function ModalAddStock({ isOpen, setIsOpen, onAddStock }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddStockFormValues>({
    resolver: zodResolver(addStockSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit = (data: AddStockFormValues) => {
    onAddStock(data);
    setIsOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Aumentar stock</DialogTitle>
          <DialogDescription>
            Ingrese la cantidad de stock a aumentar en la sucursal actual.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormInput
              label="Cantidad"
              name="quantity"
              register={register}
              errors={errors}
              inputProps={{ type: "number", placeholder: "Ej. 10" }}
            />
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Guardar cambios</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
