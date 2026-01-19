import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { FormInput } from "../common/Form/FormInput";
import { Label } from "@/components/ui/label";
import { offerSchema, type OfferFormValues } from "@/schemes/product";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  product: {
    productId: string;
    nameProd: string;
    price: number;
    priceOffer?: number;
    isOfferActive: boolean;
    startDate?: string;
    endDate?: string;
  };
  onActiveOffer: (data: OfferFormValues) => void;
}

export const ModalManageOffer = ({
  isOpen,
  setIsOpen,
  product,
  onActiveOffer,
}: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      isOfferActive: product.isOfferActive,
      priceOffer: product.priceOffer || 0,
      startDate: product.startDate?.split("T")[0] || "",
      endDate: product.endDate?.split("T")[0] || "",
      currentPrice: product.price,
    },
  });

  const isOfferActive = watch("isOfferActive");

  const onSubmit = (data: OfferFormValues) => {
    onActiveOffer(data);
    console.log("Oferta Enviada:", data);
    setIsOpen(false);
  };
  console.log(product);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Gestionar Oferta: {product.nameProd}</DialogTitle>
          <DialogDescription>
            Configura el precio especial y el rango de validez. Precio actual:{" "}
            <span className="font-bold text-foreground">${product.price}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Switch de Activación */}
          <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
            <div className="space-y-0.5">
              <Label className="text-base">Estado de la oferta</Label>
              <p className="text-sm text-muted-foreground">
                {isOfferActive
                  ? "La oferta es visible para los clientes"
                  : "La oferta está pausada"}
              </p>
            </div>
            <Switch
              checked={isOfferActive}
              onCheckedChange={(checked) => setValue("isOfferActive", checked)}
            />
          </div>

          <div
            className={
              isOfferActive
                ? "opacity-100 transition-opacity"
                : "opacity-40 pointer-events-none transition-opacity"
            }
          >
            {/* Precio de Oferta */}
            <FormInput
              label="Precio de Oferta ($)"
              name="priceOffer"
              register={register}
              errors={errors}
              inputProps={{
                type: "number",
                step: "0.01",
                placeholder: "Ej. 10.50",
              }}
            />

            {/* Rango de Fechas */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Fecha Inicio</Label>
                <input
                  type="date"
                  {...register("startDate")}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                {errors.startDate && (
                  <p className="text-xs text-red-500">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">Fecha Fin</Label>
                <input
                  type="date"
                  {...register("endDate")}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
                {errors.endDate && (
                  <p className="text-xs text-red-500">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              {product.isOfferActive ? "Actualizar Oferta" : "Crear Oferta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
