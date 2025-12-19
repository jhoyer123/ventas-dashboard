import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BranchOutput } from "@/types/branch";

const branchSchema = z.object({
  branch_name: z
    .string()
    .nonempty("campo requerido")
    .min(3, "El nombre debe tener mas de 3 letras"),
  address: z
    .string()
    .nonempty("campo requerido")
    .min(3, "La dirección debe tener mas de 3 letras"),
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
        <div className="grid gap-3">
          <Label>Nombre de la Sucursal</Label>
          <Input
            {...register("branch_name")}
            placeholder="Ingresa el nombre de la Sucursal"
          />
          {errors.branch_name && (
            <p className="text-sm text-red-500 mt-1">
              {errors.branch_name.message}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <Label>Dirección de la Sucursal</Label>
          <Input
            {...register("address")}
            placeholder="Ingresa la dirección de la Sucursal"
          />
          {errors.address && (
            <p className="text-sm text-red-500 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormBranch;
