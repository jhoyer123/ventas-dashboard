import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BranchOutput } from "@/types/branch";
import { Label } from "../ui/label";

const branchSchema = z.object({
  branch_name: z
    .string()
    .nonempty("campo requerido")
    .min(3, "El nombre debe tener mas de 3 letras"),
  address: z
    .string()
    .nonempty("campo requerido")
    .min(3, "La dirección debe tener mas de 3 letras"),
  code: z
    .string({ message: "campo requerido" })
    .nonempty("campo requerido")
    .min(3, "El codigo debe tener mas de 3 letras"),
});

type FormBranchInput = z.infer<typeof branchSchema>;

interface BranchProps {
  funParent: (data: FormBranchInput) => void;
  initialValues?: BranchOutput;
}

const FormBranch = ({ funParent, initialValues }: BranchProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormBranchInput>({
    resolver: zodResolver(branchSchema),
    defaultValues: initialValues || {},
  });

  const onSubmit = handleSubmit((data) => funParent(data));

  return (
    <form onSubmit={onSubmit} id="branch-form" noValidate>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>
            Nombre de la Sucursal
            <span className="text-destructive">*</span>
          </Label>
          <Input
            {...register("branch_name")}
            placeholder="Ingresa el nombre de la Sucursal"
          />
          {errors.branch_name && (
            <p className="text-sm text-destructive">
              {errors.branch_name.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>
            Dirección de la Sucursal
            <span className="text-destructive">*</span>
          </Label>
          <Input
            {...register("address")}
            placeholder="Ingresa la dirección de la Sucursal"
          />
          {errors.address && (
            <p className="text-sm text-destructive">{errors.address.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>
            Codigo de Sucursal
            <span className="text-destructive">*</span>
          </Label>
          <Input
            {...register("code")}
            placeholder="Ingresa el codigo de la Sucursal"
          />
          {errors.code && (
            <p className="text-sm text-destructive">{errors.code.message}</p>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormBranch;
