import FormLogin from "../../components/loginComp/FormLogin";
//hook de login tanstack-react-query
import { useLogin } from "../../hooks/auth/useLogin";
import type { loginCredentials } from "@/schemes/auth";

const LoginCard = () => {
  const { mutate, isPending, isError } = useLogin();

  const handleSubmit = (data: loginCredentials) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {/* fondo */}
      <img
        src="https://i.pinimg.com/736x/43/9e/07/439e0745fd00e29a1f6a4d10b41d425e.jpg"
        alt="imagen de fondo"
        className="absolute w-full h-full object-cover z-0 opacity-95"
      />
      {/* Card principal */}
      <div className="relative w-full max-w-md p-8 space-y-6">
        {/* Icono y título */}
        <div className="flex flex-col items-center space-y-3 text-center text-white">
          <div className="relative w-12 h-12">
            <img
              src="https://i.pinimg.com/736x/b2/d5/78/b2d57807e5e2c025b93f59e2ef574287.jpg"
              alt="icono"
              className="rounded-full"
            />
          </div>

          <h1 className="text-4xl font-semibold tracking-wide font-title">
            ¡Bienvenido de nuevo!
          </h1>
          <p className="text-[16px] text-gray-300 leading-relaxed px-4">
            Inicia sesión para acceder a tu panel administrativo, reportes
            diarios, y tu recorrido personal.
          </p>
        </div>

        {/* Formulario */}
        <FormLogin submitParent={handleSubmit} />

        {/* ESTADOS DE TANSTACK */}
        {isPending && (
          <p className="text-white text-center mt-2">
            Verificando credenciales...
          </p>
        )}

        {isError && (
          <p className="text-red-400 text-center mt-2">
            Credenciales incorrectas
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginCard;
