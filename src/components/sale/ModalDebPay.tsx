import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type DebtPaymentForm, debtPaymentSchema } from "@/schemes/debPay";
//shadcn
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormInput } from "../common/Form/FormInput";
import { FormSelect } from "../common/Form/FormSelect";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";

interface Props {
  open: boolean;
  setOpen: () => void;
  funParent: (data: DebtPaymentForm) => void;
  debt: number;
}

export function ModalDebPay({ open, setOpen, funParent, debt }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    //le pasamos la deuda actual para validar el monto maximo
    resolver: zodResolver(debtPaymentSchema(debt || 0)),
    defaultValues: {
      amount: undefined,
      paymentMethod: undefined,
      note: "",
    },
  });

  const onSubmit = (data: DebtPaymentForm) => {
    console.log(data);
    funParent(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] card-modal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Abono a la Deuda</DialogTitle>
            <DialogDescription>
              Complete el siguiente formulario para registrar un abono a la
              deuda.
              <span className="font-semibold text-red-400">{` Bs.${debt}`}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            {/* input del monto de abono a la deuda */}
            <FormInput
              label="Monto"
              name="amount"
              register={register}
              errors={errors}
              inputProps={{
                type: "number",
                placeholder: "Ingrese el monto",
                step: "0.01",
              }}
            />
            {/* select de metodo de pago */}
            <FormSelect
              control={control}
              label="metodo de pago"
              name="paymentMethod"
              options={[
                { value: "CASH", label: "Efectivo" },
                { value: "TRANSFER", label: "Transferencia" },
                { value: "QR", label: "QR" },
              ]}
              errors={errors}
            />
            {/* input de nota */}
            <div>
              <Label className="font-medium text-sm mb-1">Nota</Label>
              <textarea
                {...register("note")}
                placeholder="Nota (opcional)"
                className="file:text-foreground resize-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
