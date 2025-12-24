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
import { type BranchInput, type BranchOutput } from "@/types/branch";

interface ModalAddBranchProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: BranchInput) => void;
  initialValues?: BranchOutput;
}

export function ModalAddBranch({
  isOpen,
  setOpen,
  onSubmit,
  initialValues,
}: ModalAddBranchProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="font-title text-start pt-3  md:pt-0">
            {!initialValues ? "Crea una nueva sucursal" : "Actualizar sucursal"}
          </DialogTitle>
          <DialogDescription className="text-start font-body">
            {!initialValues
              ? "Rellena los campos del formulario con los datos de la nueva sucursal."
              : "Modifica los campos necesarios para actualizar la sucursal."}
          </DialogDescription>
        </DialogHeader>
        {/* Renderizamos el formulario de sucursal */}
        <FormBranch funParent={onSubmit} initialValues={initialValues} />
        <div className="flex justify-between mt-2">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer bg-chart-4">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" form="branch-form" className="cursor-pointer">
            {!initialValues ? "Crear Sucursal" : "Guardar Cambios"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
