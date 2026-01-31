import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  setTypeEmployee: (
    typeEmployee: "todos" | "con_acceso" | "sin_acceso",
  ) => void;
  typeEmployee: "todos" | "con_acceso" | "sin_acceso";
}

export const FilterEmployee = ({ setTypeEmployee, typeEmployee }: Props) => {
  const handleChange = (value: "todos" | "con_acceso" | "sin_acceso") => {
    setTypeEmployee(value);
  };

  return (
    <Select onValueChange={handleChange} value={typeEmployee}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Selecciona una opción" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Empleados</SelectLabel>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="con_acceso">Con acceso al sistema</SelectItem>
          <SelectItem value="sin_acceso">Sin acceso al sistema</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
