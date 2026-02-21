import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import type {
  FieldValues,
  Path,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface InputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldErrors<T>;
}

const FormInputPassword = <T extends FieldValues>({
  label,
  name,
  register,
  errors,
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="space-y-2">
      <Label
        className="block text-sm font-body text-gray-300
            sm:text-base"
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="••••••"
          {...register(name, { required: true })}
          className="w-full px-4 py-5 text-sm text-white placeholder-gray-400 bg-gray-900 rounded-none border-t border-gray-700"
        />
        {errors?.[name] && (
          <p className="text-sm text-red-500">
            {String(errors[name]?.message)}
          </p>
        )}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition cursor-pointer"
        >
          {showPassword ? <LuEye size={18} /> : <LuEyeClosed size={18} />}
        </button>
      </div>
    </div>
  );
};

export default FormInputPassword;
