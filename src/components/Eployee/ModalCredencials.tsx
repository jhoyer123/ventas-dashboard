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
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//schema y tipo
import {
  type ResetCredentialsForm,
  resetCredentialsSchema,
} from "../../schemes/credecials";
import { FormInput } from "../common/Form/FormInput";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  emailC?: string;
  funParent: (data: ResetCredentialsForm) => void;
}

export const ModalCredencials = ({
  isOpen,
  setOpen,
  emailC,
  funParent,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ResetCredentialsForm>({
    resolver: zodResolver(resetCredentialsSchema),
    defaultValues: {
      resetPassword: false,
      email: emailC,
    },
  });

  useEffect(() => {
    reset({
      email: emailC,
      resetPassword: false,
    });
  }, [isOpen]);

  const resetPassword = watch("resetPassword");

  const onSubmit = (data: ResetCredentialsForm) => {
    console.log("Reset credentials:", data);
    // aquí llamas a tu API
    funParent(data);
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[420px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Resetear credenciales</DialogTitle>
            <DialogDescription>
              Usa esta acción solo si el empleado olvidó su contraseña o cambió
              de email.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* EMAIL */}
            <FormInput
              label="Email"
              name="email"
              register={register}
              errors={errors}
              inputProps={{
                type: "text",
                defaultValue: emailC,
                placeholder: "Correo electrónico",
              }}
            />

            {/* RESET PASSWORD */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="resetPassword"
                {...register("resetPassword")}
              />
              <Label htmlFor="resetPassword">Resetear contraseña</Label>
            </div>

            {/* PASSWORD */}
            {resetPassword && (
              <FormInput
                label="Nueva contraseña"
                name="password"
                register={register}
                errors={errors}
                inputProps={{ type: "password" }}
              />
            )}
          </div>

          <DialogFooter>
            <div className="flex justify-between w-full">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="cursor-pointer">
                Guardar cambios
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
