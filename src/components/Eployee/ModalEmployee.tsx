import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
//importamos el formulario de sucursal
import FormEmployee from "./FormEmployee";
//importamos el tipo de empleado
import type { Employee, FormEmployeeInput } from "@/types/employee";

interface ModalEmployeeProps {
  isOpen: boolean;
  setOpen: () => void;
  onSubmit: (data: FormEmployeeInput) => void;
  initialValues?: Employee;
  branchIdC?: string;
  isViewMode?: boolean;
}

export function ModalEmployee({
  isOpen,
  setOpen,
  onSubmit,
  initialValues,
  branchIdC,
  isViewMode,
}: ModalEmployeeProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] bg-gray-300">
        <DialogHeader>
          <DialogTitle>
            {!initialValues ? "Crear un nuevo empleado" : "Actualizar empleado"}
          </DialogTitle>
          <DialogDescription>
            {!initialValues
              ? "Rellena el formulario para agregar un nuevo empleado."
              : "Modifica los campos necesarios para actualizar el empleado."}
          </DialogDescription>
        </DialogHeader>
        {/* Renderizamos el formulario de empleado */}
        <FormEmployee
          funParent={onSubmit}
          initialValues={initialValues}
          branchIdC={branchIdC}
          isViewMode={isViewMode}
        />
        <div className="flex justify-between mt-2">
          {!isViewMode && (
            <>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer bg-gray-200"
                >
                  Cancelar
                </Button>
              </DialogClose>

              <Button
                type="submit"
                form="form-employee"
                className="cursor-pointer"
              >
                {!initialValues ? "Crear Empleado" : "Actualizar Empleado"}
              </Button>
            </>
          )}
          {isViewMode && (
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer bg-gray-200">
                Cerrar
              </Button>
            </DialogClose>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
