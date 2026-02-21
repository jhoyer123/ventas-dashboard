import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LuEyeClosed, LuEye } from "react-icons/lu";
//importamos de zod
import { registerSchema, type RegisterFormData } from "@/schemes/register";
import { Label } from "../ui/label";
import FormInputPassword from "../common/Form/FormInputPassword";
import { FormInput } from "../common/Form/FormInput";

interface FormLoginProps {
  //submitParent: (data: loginCredentials) => void;
  isPending: boolean;
}

const FormRegister = ({ /* submitParent */ isPending }: FormLoginProps) => {
  //Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    //submitParent(data);
  };

  return (
    <div className="w-full font-body">
      <form
        className="flex flex-col gap-2 font-body"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-5">
          {/* name_organization */}
          <FormInput
            label="Nombre de la empresa"
            name="name_organization"
            register={register}
            errors={errors}
            className="w-full px-4 py-5 text-sm text-white placeholder-gray-400 bg-gray-900 rounded-none border-t border-gray-700"
            labelClassName="block text-sm font-body text-gray-300 sm:text-base"
            inputProps={{ placeholder: "Delux" }}
          />

          {/* nombre del suuario */}
          <FormInput
            label="Nombre completo"
            name="full_name"
            register={register}
            errors={errors}
            className="w-full px-4 py-5 text-sm text-white placeholder-gray-400 bg-gray-900 rounded-none border-t border-gray-700"
            labelClassName="block text-sm font-body text-gray-300 sm:text-base"
            inputProps={{ placeholder: "Juan Perez Rivera" }}
          />

          {/* Phone */}
          <FormInput
            label="Teléfono"
            name="phone"
            register={register}
            errors={errors}
            className="w-full px-4 py-5 text-sm text-white placeholder-gray-400 bg-gray-900 rounded-none border-t border-gray-700"
            labelClassName="block text-sm font-body text-gray-300 sm:text-base"
            inputProps={{ placeholder: "64553424    " }}
          />

          {/* Email */}
          <FormInput
            label="Correo electrónico"
            name="email"
            register={register}
            errors={errors}
            className="w-full px-4 py-5 text-sm text-white placeholder-gray-400 bg-gray-900 rounded-none border-t border-gray-700"
            labelClassName="block text-sm font-body text-gray-300 sm:text-base"
            inputProps={{ placeholder: "juan@gmail.com" }}
          />

          {/* Password */}
          <FormInputPassword
            label="Contraseña"
            name="password"
            register={register}
            errors={errors}
          />

          {/* confirm password */}
          <FormInputPassword
            label="Confirmar contraseña"
            name="confirmPassword"
            register={register}
            errors={errors}
          />

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            className="w-full mt-5 py-3 text-base font-title font-medium text-black bg-white rounded-2xl hover:bg-gray-200 transition duration-200 shadow-lg 
            cursor-pointer"
            disabled={isPending}
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
