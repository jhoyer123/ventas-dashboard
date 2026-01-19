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
import { FormCategory } from "./FormCategory";
import { type categoryInput, type CategoryType } from "@/types/category";

interface propsModalCategory {
  isOpen: boolean;
  setIsOpen: () => void;
  funSubParent: (data: categoryInput) => void;
  initialData?: CategoryType;
  mode?: "create" | "update" | "view";
}

export function ModalCategory({
  isOpen,
  setIsOpen,
  funSubParent,
  initialData,
  mode,
}: propsModalCategory) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Crear categoria"
              : mode === "update"
                ? "Actualizar categoria"
                : "Detalle de la categoria"}
          </DialogTitle>
          <DialogDescription>
            {mode === "view"
              ? "Visualiza la información de la categoria."
              : initialData
                ? "Actualiza la información de la categoria."
                : "Complete el formulario para crear una nueva categoria."}
          </DialogDescription>
        </DialogHeader>
        {/* formulario category */}
        <FormCategory
          funSubParent={funSubParent}
          initialData={initialData}
          mode={mode}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" form="form-category">
            {initialData ? "Actualizar" : "Crear"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
