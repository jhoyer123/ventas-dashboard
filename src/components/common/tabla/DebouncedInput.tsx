import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

interface DebouncedInputProps {
  onChange: (value: string | number) => void;
  debounce?: number;
  valueDafault: string | number;
  placeholder?: string;
}
// Input que espera X tiempo antes de notificar el cambio
export function DebouncedInput({
  onChange,
  debounce = 300,
  valueDafault,
  placeholder = "Buscar...",
}: DebouncedInputProps) {
  const [value, setValue] = useState(valueDafault);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="relative w-full max-w-[425px]">
      {/* Ícono de búsqueda a la izquierda */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-card pointer-events-none" />

      {/* Input con padding para el ícono */}
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10 pr-10 h-10 border-border bg-card text-card-foreground focus:ring-ring transition-all"
      />

      {/* Botón para limpiar (solo visible cuando hay texto) */}
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-card hover:text-foreground-card/80 transition-colors"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
