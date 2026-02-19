import { AlertCircle } from "lucide-react";

const Error = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5 items-center bg-background-view justify-center">
      <AlertCircle className="text-destructive" size={48} />
      <h2 className="text-2xl font-bold text-foreground text-center">
        Se ha producido un error inesperado
      </h2>
      <p className="text-muted-foreground text-center max-w-md">
        Por favor, inténtalo de nuevo más tarde y si el error persiste, contacta
        con soporte técnico.
      </p>
    </div>
  );
};

export default Error;
