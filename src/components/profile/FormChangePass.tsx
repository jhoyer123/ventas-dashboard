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
    <div className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-sm border border-slate-100 p-8 md:p-12 mt-2">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-800">Seguridad</h3>
        <p className="text-slate-400 text-sm">
          Actualiza tu contraseña para mantener tu cuenta segura
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Contraseña Actual - Ocupa ancho completo en el grid */}
        <div className="md:col-span-2 space-y-2">
          <Label className="font-bold text-slate-700">Contraseña actual</Label>
          <div className="relative group">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-400 transition-colors"
              size={18}
            />
            <Input
              type={show.current ? "text" : "password"}
              className="pl-10 pr-12 py-6 bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-orange-200 text-slate-600 rounded-2xl"
              {...register("currentPassword")}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => toggle("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
          <Label className="font-bold text-slate-700">Nueva contraseña</Label>
          <div className="relative group">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-400 transition-colors"
              size={18}
            />
            <Input
              type={show.next ? "text" : "password"}
              className="pl-10 pr-12 py-6 bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-orange-200 text-slate-600 rounded-2xl"
              {...register("newPassword")}
              placeholder="Nueva contraseña"
            />

            <button
              type="button"
              onClick={() => toggle("next")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
          <Label className="font-bold text-slate-700">
            Confirmar contraseña
          </Label>
          <div className="relative group">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-400 transition-colors"
              size={18}
            />
            <Input
              type={show.confirm ? "text" : "password"}
              className="pl-10 pr-12 py-6 bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-orange-200 text-slate-600 rounded-2xl"
              {...register("confirmPassword")}
              placeholder="Repite la contraseña"
            />
            <button
              type="button"
              onClick={() => toggle("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
            className="cursor-pointer w-full md:w-auto px-10 py-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-full transition-all shadow-lg active:scale-95"
          >
            Actualizar contraseña
          </Button>
        </div>
      </form>
    </div>
  );
};
