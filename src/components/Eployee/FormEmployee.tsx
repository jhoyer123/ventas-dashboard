import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
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
import { useEffect, useState } from "react";
//importamos el schema y el tipo de zod
import { EmployeeSchema } from "@/types/employee";
import type { FormEmployeeInput, Employee } from "@/types/employee";
import { FormInput } from "../common/Form/FormInput";
import { FormSelect } from "../common/Form/FormSelect";
import SectionUser from "./SectionUser";

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
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormEmployeeInput>({
    resolver: zodResolver(EmployeeSchema),
    defaultValues: initialValues || {
      job: undefined,
      branchId: branchIdC ?? "",
      hasSystemAccess: false,
    },
  });
  //si no hay initial values seteamos el hasSystemAccess en false
  useEffect(() => {
    setValue("hasSystemAccess", false);
  }, []);
  //obtenemos las sucursales
  const { data: branches } = useGetBranches();
  //funcion para el submit
  const onsubmit = (data: FormEmployeeInput) => {
    //console.log(data);
    funParent(data);
  };
  //open del datepicker
  const [open, setOpen] = useState(false);
  const hasAccess = !initialValues?.email ? watch("hasSystemAccess") : true;
  return (
    <fieldset disabled={isViewMode}>
      <form onSubmit={handleSubmit(onsubmit)} id="form-employee">
        <div className="grid gap-4">
          {hasAccess && (
            <SectionUser
              control={control}
              register={register}
              errors={errors}
              isViewMode={isViewMode}
              initialValues={initialValues}
            />
          )}
          {!initialValues && (
            <div>
              <input
                type="checkbox"
                disabled={isViewMode}
                {...register("hasSystemAccess")}
              />
              <label className="ml-2 text-sm text-foreground-secondary">
                Marca y llena los campos de arriba solo si el empleado tendrá
                acceso al sistema.
              </label>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Nombre"
              name="name"
              register={register}
              errors={errors}
              inputProps={{
                type: "text",
                placeholder: "Juan Perez G",
              }}
            />
            {/* imput para seleccionar la sucursal donde trabajara el empleado */}
            <FormSelect
              control={control}
              label="Sucursal Asignada"
              name="branchId"
              errors={errors}
              options={
                branches?.map((branch) => ({
                  value: branch.id || "N/A",
                  label: branch.branch_name,
                })) || []
              }
              placeholder="selecciona una sucursal"
              disabled={isViewMode}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 grid-cols-1">
            <FormInput
              label="Cedula"
              name="cedula"
              register={register}
              errors={errors}
              inputProps={{
                type: "text",
                placeholder: "123456789 lp",
              }}
            />

            <FormInput
              label="Teléfono"
              name="phone"
              register={register}
              errors={errors}
              inputProps={{
                type: "text",
                placeholder: "77798765",
              }}
            />
          </div>
          <FormInput
            label="Dirección"
            register={register}
            name="address"
            errors={errors}
            inputProps={{
              type: "text",
              placeholder: "Calle Falsa 123",
            }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* datepicker para la fecha de nacimiento */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="birthDate" className="px-1">
                Fecha de Nacimiento
              </Label>
              {/* Usar Controller para birthDate */}
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
                        {/* Mostrar field.value en lugar de date */}
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
                        // Usar field.value para 'selected'
                        selected={field.value}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          // Usar field.onChange para actualizar RHF
                          field.onChange(date);
                          setOpen(false); // Cierra el popover
                        }}
                        // Propiedad para Zod/RHF
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
            <FormSelect
              control={control}
              label="Puesto"
              name="job"
              options={[
                { value: "GERENTE DE SUCURSAL", label: "Gerente de Sucursal" },
                { value: "ALMACEN", label: "Almacen" },
                { value: "SOPORTE ALMACEN", label: "Soporte de Almacen" },
                { value: "SEGURIDAD", label: "Seguridad" },
              ]}
              errors={errors}
              placeholder="selecciona un puesto"
              disabled={isViewMode}
            />
          </div>
        </div>
      </form>
    </fieldset>
  );
};

export default FormEmployee;
