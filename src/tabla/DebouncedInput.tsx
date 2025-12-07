import { useEffect, useState } from "react";

// Input que espera X tiempo antes de notificar el cambio
export function DebouncedInput({
  onChange,
  debounce = 500,
  valueDafault,
}: {
  valueDafault: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
}) {
  const [value, setValue] = useState(valueDafault);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="border p-2 rounded mb-2 w-full max-w-sm" // Estilos básicos (Tailwind o CSS)
    />
  );
}
