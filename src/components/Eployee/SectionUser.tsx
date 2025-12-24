import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { FormInput } from "../common/Form/FormInput";
import { FormSelect } from "../common/Form/FormSelect";
import type { FormEmployeeInput } from "@/types/employee";

interface Props {
  register: UseFormRegister<FormEmployeeInput>;
  errors?: FieldErrors<FormEmployeeInput>;
  control: Control<FormEmployeeInput>;
  isViewMode?: boolean;
}

export function SectionUser({ register, errors, control, isViewMode }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
