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
  transferStockSchema,
  type TransferStockValues,
} from "@/schemes/branchProd";
import { FormInput } from "../common/Form/FormInput";
import { FormSelect } from "../common/Form/FormSelect";
//hook para obtener sucursales
import { useGetBranches } from "@/hooks/branch/useGetBranches";
//context de sucursal
import { useBranch } from "@/context/BranchContext";

interface Props {
  isOpen: boolean;
  setIsOpen: () => void;
  stockCurrent?: number;
  onTransferStock: (data: TransferStockValues) => void;
}

export function ModalTransferStock({
  isOpen,
  setIsOpen,
  stockCurrent,
  onTransferStock,
}: Props) {
  const { data: branches = [] } = useGetBranches();
  const { currentBranch } = useBranch();
  // opciones para el select (quitamos sucursal actual)
  const branchOptions = branches
    .filter((b) => b.id !== currentBranch)
    .map((b) => ({
      value: b.id,
      label: b.branchName,
    }));

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transferStockSchema),
    defaultValues: {
      quantity: 1,
      destinationBranchId: undefined,
      stockCurrent: stockCurrent!, // 👈 viene del sistema
    },
  });

  const onSubmit = (data: TransferStockValues) => {
    onTransferStock(data);
    setIsOpen();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transferir stock</DialogTitle>
          <DialogDescription>
            Selecciona la sucursal destino y la cantidad a transferir.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Cantidad */}
          <FormInput
            label="Cantidad"
            name="quantity"
            register={register}
            errors={errors}
            inputProps={{ type: "number", min: 1 }}
          />

          {/* Sucursal destino */}
          <FormSelect
            label="Sucursal destino"
            name="destinationBranchId"
            control={control}
            options={branchOptions}
            placeholder="Selecciona una sucursal"
            errors={errors}
          />

          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Transferir</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
