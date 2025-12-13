import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
//traemos las sucursales (branches)
import { useGetBranches } from "@/hooks/branch/useGetBranches";
import { useState } from "react";
//importamos el schema y el tipo de zod
import { EmployeeSchema } from "@/types/employee";
import type { FormEmployeeInput, Employee } from "@/types/employee";

interface EmployeeProps {
  funParent: (data: FormEmployeeInput) => void;
  initialValues?: Employee;
  branchIdC?: string;
  isViewMode?: boolean;
}

const FormEmployee = ({
  funParent,
  initialValues,
  branchIdC,
  isViewMode = false,
}: EmployeeProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormEmployeeInput>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: initialValues || {
      job: undefined,
      branchId: branchIdC ?? "",
    },
  });
  //obtenemos las sucursales
  const { data: branches } = useGetBranches();
  //funcion para el submit
  const onsubmit = (data: FormEmployeeInput) => {
    //console.log(data);
    funParent(data);
  };
  //open del datepicker
  const [open, setOpen] = useState(false);

  return (
    <fieldset disabled={isViewMode}>
      <form onSubmit={handleSubmit(onsubmit)} id="form-employee">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <Label>Nombre del Empleado</Label>
              <Input
                {...register("name")}
                placeholder="Ingresa el nombre del empleado"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            {/* imput para seleccionar la sucursal donde trabajara el empleado */}
            <div className="grid gap-3">
              <Label>Sucursal en la trabajara</Label>
              <Controller
                name="branchId" // <-- El nombre debe coincidir con tu esquema Zod
                control={control} // <-- Pásale el 'control'
                render={({ field }) => (
                  <div className="my-3">
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger disabled={isViewMode} className="w-auto">
                        {/* La ref debe ir en el SelectTrigger o en el input subyacente, 
                    pero Controller se encarga de la lógica de conexión. */}
                        <SelectValue placeholder="Selecciona una sucursal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sucursales</SelectLabel>
                          {branches?.map((branch) => (
                            <SelectItem key={branch.id} value={branch.id}>
                              {branch.branchName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.branchId && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.branchId.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 grid-cols-1">
            <div className="grid gap-3">
              <Label>Cedula del Empleado</Label>
              <Input
                {...register("cedula")}
                placeholder="Ingresa la cedula del empleado"
              />
              {errors.cedula && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.cedula.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label>Teléfono del Empleado</Label>
              <Input
                {...register("phone")}
                placeholder="Ingresa el teléfono del empleado"
              />
              {errors.phone && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-3">
            <Label>Dirección del Empleado</Label>
            <Input
              {...register("address")}
              placeholder="Ingresa la dirección del empleado"
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* datepicker para la fecha de nacimiento */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="birthDate" className="px-1">
                Fecha de Nacimiento
              </Label>

              {/* 🚀 1. Usar Controller para birthDate */}
              <Controller
                name="birthDate"
                control={control}
                // 'field' nos dará el valor actual (value) y la función para cambiarlo (onChange)
                render={({ field }) => (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="birthDate"
                        className="w-48 justify-between font-normal"
                      >
                        {/* 🚀 2. Mostrar field.value en lugar de date */}
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "Selecciona una fecha"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        // 🚀 3. Usar field.value para 'selected'
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          // 🚀 4. Usar field.onChange para actualizar RHF
                          field.onChange(date);
                          setOpen(false); // Cierra el popover
                        }}
                        // 🚀 5. Propiedad para Zod/RHF
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.birthDate && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
            {/* puesto del empleado */}
            <div>
              <Label>Puesto del Empleado</Label>
              <Controller
                name="job" // <-- El nombre debe coincidir con tu esquema Zod
                control={control} // <-- Pásale el 'control'
                render={({ field }) => (
                  // El prop 'field' contiene { onChange, onBlur, value, name, ref }
                  <div className="my-3">
                    <Select
                      onValueChange={field.onChange} // <-- Usa field.onChange
                      value={field.value} // <-- Usa field.value
                    >
                      <SelectTrigger disabled={isViewMode} className="w-auto">
                        {/* La ref debe ir en el SelectTrigger o en el input subyacente, 
                    pero Controller se encarga de la lógica de conexión. */}
                        <SelectValue placeholder="Selecciona un puesto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Puestos</SelectLabel>
                          <SelectItem value="ALMACEN">Almacen</SelectItem>
                          <SelectItem value="SOPORTE ALMACEN">
                            Soporte de Almacen
                          </SelectItem>
                          <SelectItem value="SEGURIDAD">Seguridad</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.job && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.job.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </fieldset>
  );
};

export default FormEmployee;
