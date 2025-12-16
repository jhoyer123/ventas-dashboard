import { Controller, type FieldValues, type Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Control, FieldErrors } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  control: Control<T>;
  options: SelectOption[];
  placeholder?: string;
  errors?: FieldErrors<T>;
  disabled?: boolean; 
}

export function FormSelect<T extends FieldValues>({
  label,
  name,
  control,
  options,
  placeholder = "Selecciona una opción",
  errors,
  disabled = false,
}: FormSelectProps<T>) {
  return (
    <div className="grid gap-2 w-full">
      <Label htmlFor={name}>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select value={field.value || ""} onValueChange={field.onChange} disabled={disabled}>
            <SelectTrigger className="w-full bg-gray-50">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {errors?.[name] && (
        <p className="text-sm text-red-500">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
