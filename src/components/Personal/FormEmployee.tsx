import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Jobs = [
  "CEO",
  "GERENTE DE SUCURSAL",
  "ALMACEN",
  "SEGURIDAD",
  "SOPORTE ALMACEN",
] as const;

const EmployeeSchema = z.object({
  name: z
    .string()
    .nonempty("campo requerido")
    .min(3, "El nombre debe tener mas de 3 letras"),
  cedula: z.string().min(4, "La cedula debe tener mas de 4 letras"),
  address: z.string().min(3, "La dirección debe tener mas de 3 letras"),
  phone: z.string().min(7, "El teléfono debe tener mas de 7 números"),
  birthDate: z.date().min(new Date("1900-01-01")).max(new Date()),
  job: z.enum(Jobs, {
    message: "El rol es obligatorio y debe ser seleccionado.",
  }),
  branchId: z.string().nonempty("La sucursal es obligatoria."),
});

type FormEmployeeInput = z.infer<typeof EmployeeSchema>;

interface EmployeeProps {
  funParent: (data: FormEmployeeInput) => void;
  initialValues?: FormEmployeeInput;
}

const FormEmployee = ({ funParent, initialValues }: EmployeeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormEmployeeInput>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: initialValues || {},
  });

  return (
    <form>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label>Nombre del Empleado</Label>
          <Input
            {...register("name")}
            placeholder="Ingresa el nombre del empleado"
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label>Cedula del Empleado</Label>
          <Input
            {...register("cedula")}
            placeholder="Ingresa la cedula del empleado"
          />
          {errors.cedula && (
            <p className="text-sm text-red-500 mt-1">{errors.cedula.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label>Dirección del Empleado</Label>
          <Input
            {...register("address")}
            placeholder="Ingresa la dirección del empleado"
          />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label>Teléfono del Empleado</Label>
          <Input
            {...register("phone")}
            placeholder="Ingresa el teléfono del empleado"
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div>
            <input type="date" />
        </div>
      </div>
    </form>
  );
};

export default FormEmployee;
