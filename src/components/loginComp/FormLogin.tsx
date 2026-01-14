import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LuEyeClosed, LuEye } from "react-icons/lu";
//importamos de zod
import { loginSchema, type loginCredentials } from "../../schemes/auth";

interface FormLoginProps {
  submitParent: (data: loginCredentials) => void;
}

const FormLogin = ({ submitParent }: FormLoginProps) => {
  //Form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginCredentials> = (data) => {
    //console.log(data);
    submitParent(data);
  };

  // Lógica para ver el password
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full font-body">
      <form
        className="flex flex-col gap-2 font-body"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label
              className="block text-sm font-body text-gray-300
            sm:text-base"
            >
              Correo electrónico
            </label>
            <div>
              <input
                type="email"
                placeholder="Ingresa tu email"
                {...register("email", { required: true })}
                className="w-full px-4 py-3 text-sm text-white placeholder-gray-400 bg-gray-900"
              />
              {errors.email && (
                <div className="text-red-400 text-sm mt-1">
                  {errors.email.message}
                </div>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              className="block text-sm font-body text-gray-300
            sm:text-base"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                {...register("password", { required: true })}
                className="w-full px-4 py-3 text-sm text-white placeholder-gray-400 bg-gray-900"
              />
              {errors.password && (
                <div className="text-red-400 text-sm mt-1">
                  {errors.password.message}
                </div>
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

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            className="w-full mt-5 py-3 text-base font-title font-medium text-black bg-white rounded-2xl hover:bg-gray-200 transition duration-200 shadow-lg 
            cursor-pointer"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
