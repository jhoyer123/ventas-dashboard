import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//iport del schema y el type
import { categorySchema, type categoryInput, type CategoryType } from "@/types/category";
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
          <Label className="text-sm font-semibold">Descripción</Label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Descripción de la categoría"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
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
