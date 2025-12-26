import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { FormInput } from "../common/Form/FormInput";
import { FormSelect } from "../common/Form/FormSelect";
import type { Employee, FormEmployeeInput } from "@/types/employee";

interface Props {
  register: UseFormRegister<FormEmployeeInput>;
  errors?: FieldErrors<FormEmployeeInput>;
  control: Control<FormEmployeeInput>;
  isViewMode?: boolean;
  initialValues?: Employee;
}
export function SectionUser({
  register,
  errors,
  control,
  isViewMode,
  initialValues,
}: Props) {
  const ver = !initialValues ? true : isViewMode;
  return (
    <div className="grid grid-cols-1 gap-3">
      <div
        className={`grid grid-cols-1 gap-4 ${
          isViewMode ? "md:grid-cols-1" : "md:grid-cols-2"
        }`}
      >
        {ver && (
          <FormInput
            label="Email"
            name="email"
            register={register}
            errors={errors}
            inputProps={{
              type: "email",
              disabled: isViewMode,
              placeholder: "ejemplo@correo.com",
            }}
          />
        )}

        {!initialValues && (
          <FormInput
            label="Contraseña"
            name="password"
            register={register}
            errors={errors}
            inputProps={{
              type: "password",
              disabled: isViewMode,
              placeholder: "********",
            }}
          />
        )}
      </div>
      <FormSelect
        control={control}
        label="Rol en el sistema"
        name="systemRole"
        options={[
          { value: "ADMIN", label: "Administrador" },
          { value: "SELLER", label: "Vendedor" },
          { value: "INVENTORY", label: "Inventario" },
        ]}
        errors={errors}
        disabled={isViewMode}
        placeholder="Seleccion un rol"
      />
    </div>
  );
}

export default SectionUser;
