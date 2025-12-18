import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { LuEyeClosed, LuEye } from "react-icons/lu";
// Asegúrate de que el CSS de 'inputs' no interfiera con el posicionamiento

// tipado de los inputs del formulario
type Inputs = {
  email: string;
  password: string;
};

interface FormLoginProps {
  submitParent: (data: Inputs) => void;
}

const FormLogin = ({ submitParent }: FormLoginProps) => {
  //Form hook
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
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
            <label className="block text-sm font-medium text-gray-300">
              Correo
            </label>
            <input
              type="email"
              placeholder="Ingresa tu email"
              {...register("email", { required: true })}
              className="w-full px-4 py-3 text-sm text-white placeholder-gray-400 bg-indigo-900/30 border border-indigo-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                {...register("password", { required: true })}
                className="w-full px-4 py-3 pr-12 text-sm text-white placeholder-gray-400 bg-indigo-900/30 border border-indigo-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition cursor-pointer"
              >
                {showPassword ? <LuEye size={18} /> : <LuEyeClosed size={18} />}
              </button>
            </div>
          </div>

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            className="w-full py-3.5 text-base font-medium text-gray-800 bg-white rounded-2xl hover:bg-gray-100 transition duration-200 shadow-lg cursor-pointer"
          >
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
