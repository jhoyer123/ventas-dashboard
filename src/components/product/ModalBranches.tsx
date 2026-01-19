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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// imports del formulario
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import de react
import { useEffect } from "react";
//import de types para el formulario y el schema de validacion
import {
  type BranchStockFormValues,
  branchStockSchema,
} from "@/schemes/branchProd";
import type { StockBranchI } from "@/types/stockProdBranch";
//import del hook para obtener sucursales
import { useGetBranckSP } from "@/hooks/branch/useGetBranchSP";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  open: boolean;
  setOpen: () => void;
  funParent: (dataStock: StockBranchI[]) => void;
  productId?: string;
}

export function ModalBranches({ open, setOpen, funParent, productId }: Props) {
  const { data: branches, isPending } = useGetBranckSP(productId || "");
  const form = useForm<BranchStockFormValues>({
    resolver: zodResolver(branchStockSchema),
    defaultValues: { branches: [] },
  });

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "branches",
  });

  // Limpiar/Resetear el formulario cuando el modal se cierra o abre
  useEffect(() => {
    if (branches) {
      replace(
        branches.map((b) => ({
          branchId: b.id,
          branchName: b.branchName,
          selected: false,
          stock: 0,
        })),
      );
    }
  }, [branches, replace, open]);

  //Función para manejar el cambio del checkbox
  const toggleBranch = (index: number, isChecked: boolean) => {
    // Si se desmarca (isChecked es false), reseteamos el stock a 0
    if (!isChecked) {
      setValue(`branches.${index}.stock`, 0);
    }
    // Registramos el cambio del checkbox manualmente
    setValue(`branches.${index}.selected`, isChecked, { shouldValidate: true });
    form.trigger("branches");
  };

  const onSubmit = (values: BranchStockFormValues) => {
    // Solo filtramos las que el usuario seleccionó para enviar al servidor
    const selectedBranches = values.branches
      .filter((b) => b.selected)
      .map(({ branchId, stock }) => ({ branchId, stock }));

    form.reset();
    funParent(selectedBranches);
    setOpen();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="card-modal px-1 pb-3 md:px-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle className="text-center">
              Asignar a Sucursales
            </DialogTitle>
            <DialogDescription className="text-center">
              {branches && branches.length > 0 ? (
                <>Selecciona las sucursales y asigna el stock inicial.</>
              ) : null}
            </DialogDescription>
          </DialogHeader>

          {isPending ? (
            <div className="space-y-2 h-full w-full py-4">
              <Skeleton className="h-4 w-[250px] mx-auto" />
              <Skeleton className="h-4 w-[200px] mx-auto" />
            </div>
          ) : (
            <div className="py-4 space-y-2">
              {/* si no hay sucursales mostramos mensage claro */}
              {branches && branches.length === 0 && (
                <p className="text-sm text-muted-foreground text-center">
                  Este producto ya esta agregado en todas las sucursales
                  existentes.
                </p>
              )}
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between gap-2 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* Usamos un input nativo para simplicidad con RHF */}
                    <input
                      type="checkbox"
                      {...register(`branches.${index}.selected`)}
                      onChange={(e) => toggleBranch(index, e.target.checked)}
                      className="min-w-4 size-4"
                    />
                    <Label className="font-medium text-wrap max-w-[350px]">
                      {field.branchName}
                    </Label>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <Input
                      type="number"
                      placeholder="Stock"
                      className="w-18 md:w-26"
                      disabled={!watch(`branches.${index}.selected`)}
                      {...register(`branches.${index}.stock`, {
                        valueAsNumber: true,
                      })}
                    />
                    {/* Error individual por stock si fuera necesario */}
                    {errors.branches?.[index]?.stock && (
                      <span className="text-[10px] text-destructive uppercase font-bold">
                        Inválido
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {/* Error global (si no seleccionó ninguna sucursal) */}
              {errors.branches?.root && (
                <p className="text-xs text-destructive font-medium">
                  {errors.branches.root.message}
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" className="btn-cancel">
                {fields.length > 0 ? "Cancelar" : "Cerrar"}
              </Button>
            </DialogClose>
            {fields.length > 0 && (
              <Button type="submit" className="cursor-pointer">Agregar y guardar</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
