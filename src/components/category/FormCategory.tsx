import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//iport del schema y el type
import {
  categorySchema,
  type categoryInput,
  type CategoryType,
} from "@/types/category";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FormInput } from "../common/Form/FormInput";

interface props {
  funSubParent: (data: categoryInput) => void;
  initialData?: CategoryType;
}

export const FormCategory = ({ funSubParent, initialData }: props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<categoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || { nameCat: "", description: "" },
  });

  const onSubmit = (data: categoryInput) => {
    console.log(data);
    funSubParent(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="form-category"
        className="space-y-4"
      >
        {/* Nombre del producto */}
        <FormInput
          label="Nombre"
          name="nameCat"
          register={register}
          errors={errors}
          inputProps={{
            type: "text",
            placeholder: "ejemplo laptops",
          }}
        />
        {/* descripción */}
        <div className="grid gap-2">
          <Label className="font-medium text-sm">Descripción</Label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Descripción de la categoría"
            className="file:text-foreground resize-none placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
            rows={4}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};
