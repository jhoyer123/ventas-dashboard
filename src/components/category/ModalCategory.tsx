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
import { type categoryInput } from "@/types/category";

interface propsModalCategory {
  isOpen: boolean;
  setIsOpen: () => void;
  funSubParent: (data: categoryInput) => void;
}

export function ModalCategory({
  isOpen,
  setIsOpen,
  funSubParent,
}: propsModalCategory) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear categoria</DialogTitle>
          <DialogDescription>
            Complete el formulario para crear una nueva categoria.
          </DialogDescription>
        </DialogHeader>
        {/* formulario category */}
        <FormCategory funSubParent={funSubParent} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" form="form-category">
            Crear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
