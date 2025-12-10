import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  //DialogTrigger,
} from "@/components/ui/dialog";
//importamos el formulario de sucursal
import FormBranch from "./FormBranch";
import { type BranchInput } from "@/types/branch";

interface ModalAddBranchProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: BranchInput) => void;
  initialValues?: BranchInput;
}

export function ModalAddBranch({
  isOpen,
  setOpen,
  onSubmit,
  initialValues,
}: ModalAddBranchProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {!initialValues
              ? "Crear una nueva sucursal"
              : "Actualizar sucursal"}
          </DialogTitle>
          <DialogDescription>
            {!initialValues
              ? "Rellena el formulario para crear una nueva sucursal."
              : "Modifica los campos necesarios para actualizar la sucursal."}
          </DialogDescription>
        </DialogHeader>
        {/* Renderizamos el formulario de sucursal */}
        <FormBranch funParent={onSubmit} initialValues={initialValues} />
        <div className="flex justify-between mt-2">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer bg-gray-200">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" form="branch-form" className="cursor-pointer">
            {!initialValues ? "Crear Sucursal" : "Actualizar Sucursal"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
