import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";
import { passwordSchema, type PasswordChange } from "../../schemes/profile";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Props {
  funParent: (data: PasswordChange) => void;
}

//formulario cambio de contraseña
export const FormChangePass = ({ funParent }: Props) => {
  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  });

  const toggle = (k: keyof typeof show) =>
    setShow((s) => ({ ...s, [k]: !s[k] }));

  const form = useForm<PasswordChange>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { register, handleSubmit, formState } = form;

  const onSubmit = (data: PasswordChange) => {
    funParent(data);
    form.reset();
  };

  return (
    <div className="w-full max-w-4xl bg-card rounded-xl shadow-sm border border-border p-8 md:p-12 mt-2">
      <div className="mb-8 space-y-2">
        <h3 className="text-xl font-bold text-card-foreground">Seguridad</h3>
        <p className="text-muted-foreground text-sm">
          Actualiza tu contraseña para mantener tu cuenta segura
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Contraseña Actual - Ocupa ancho completo en el grid */}
        <div className="md:col-span-2 space-y-2">
          <Label>Contraseña actual</Label>
          <div className="relative group">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              type={show.current ? "text" : "password"}
              className="pl-10 pr-12 py-6 text-card-foreground rounded-2xl"
              {...register("currentPassword")}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => toggle("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formState.errors.currentPassword && (
            <p className="text-xs text-red-500 font-medium ml-2">
              {formState.errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* Nueva Contraseña */}
        <div className="space-y-2">
          <Label>Nueva contraseña</Label>
          <div className="relative group">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              type={show.next ? "text" : "password"}
              className="pl-10 pr-12 py-6 rounded-2xl"
              {...register("newPassword")}
              placeholder="Nueva contraseña"
            />

            <button
              type="button"
              onClick={() => toggle("next")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {show.next ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formState.errors.newPassword && (
            <p className="text-xs text-red-500 font-medium ml-2">
              {formState.errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirmar Contraseña */}
        <div className="space-y-2">
          <Label>Confirmar contraseña</Label>
          <div className="relative group">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              type={show.confirm ? "text" : "password"}
              className="pl-10 pr-12 py-6 rounded-2xl"
              {...register("confirmPassword")}
              placeholder="Repite la contraseña"
            />
            <button
              type="button"
              onClick={() => toggle("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formState.errors.confirmPassword && (
            <p className="text-xs text-red-500 font-medium ml-2">
              {formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Botón de envío */}
        <div className="md:col-span-2 pt-4 flex justify-end">
          <Button
            type="submit"
            className="cursor-pointer w-full md:w-auto px-10 py-6 rounded-full shadow-lg "
          >
            Actualizar contraseña
          </Button>
        </div>
      </form>
    </div>
  );
};
