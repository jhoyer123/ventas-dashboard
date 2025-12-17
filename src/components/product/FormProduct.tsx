import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Shadcn components
import { Label } from "@/components/ui/label";
//type actegory
import type { CategoryType } from "@/types/category";
//import del supertype
import { type ProductType } from "@/types/product";
//type product types
import {
  productFormSchema,
  type ProductInputService,
  productFormSchemaUpdate,
} from "@/schemes/product";
//components del form
import RichTextEditor from "./RichTextEditor";
import { FormInput } from "@/components/common/Form/FormInput";
import { FormSelect } from "../common/Form/FormSelect";
import InputFile from "./InputFile";
import { useEffect } from "react";

interface CreateProductProps {
  categories: CategoryType[];
  funParent: (data: ProductInputService) => void;
  initialData?: ProductType;
  mode: "create" | "update" | "view";
}

const FormProduct = ({
  categories,
  funParent,
  initialData,
  mode,
}: CreateProductProps) => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(
      mode === "update" ? productFormSchemaUpdate : productFormSchema
    ),
    defaultValues: initialData || {
      categoryId: undefined,
      imageToDelete: [],
    },
  });

  //hidratar el Form
  useEffect(() => {
    if ((mode === "update" || mode === "view") && initialData) {
      reset({
        nameProd: initialData.nameProd,
        sku: initialData.sku ?? "",
        brand: initialData.brand ?? "",
        price: initialData.price,
        cost: initialData.cost,
        description: initialData.description,
        categoryId: initialData.categoryId,

        // imágenes existentes
        imageExisting: initialData.imageExisting,
        imageToDelete: [],
      });
    }
  }, [initialData]);

  //refinar las categorias para el select
  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.nameCat,
  }));

  // Función helper para transformar los datos
  function transformProductData(data: ProductType) {
    return {
      ...data,
      images: Array.from(data.images || []),
    };
  }
  //manejo del submit
  const onSubmit = (data: ProductType) => {
    const transformedData = transformProductData(data);
    console.log("Transformed Data:", transformedData);
    funParent(transformedData);
    //Forzamos el valor a undefined explícitamente
    reset({
      ...initialData, // o valores por defecto
      nameProd: "",
      brand: "",
      sku: "",
      categoryId: undefined, // CLAVE: debe ser undefined
      description: "",
      price: 0,
      cost: 0,
      images: undefined,
      imageExisting: [],
      imageToDelete: [],
    });
  };

  useEffect(() => {
    register("imageToDelete");
  }, [register]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto grid gap-6"
      id="product-form"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nombre del producto */}
        <FormInput
          label="Nombre"
          name="nameProd"
          register={register}
          errors={errors}
          inputProps={{
            type: "text",
            placeholder: "Ej: Laptop Gamer",
            disabled: mode === "view",
          }}
        />
        <FormSelect
          label="Categoría"
          name="categoryId"
          control={control}
          options={categoryOptions ?? []}
          placeholder="Categoría"
          errors={errors}
          disabled={mode === "view"}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* SKU */}
          <FormInput
            label="Código"
            name="sku"
            register={register}
            errors={errors}
            inputProps={{
              type: "text",
              placeholder: "PROD-00123",
              disabled: mode === "view",
            }}
          />
          {/* Marca */}
          <FormInput
            label="Marca"
            name="brand"
            register={register}
            errors={errors}
            inputProps={{
              type: "text",
              disabled: mode === "view",
              placeholder: "samsung",
            }}
          />
        </div>

        {/* Precio + Costo */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            {/* precio */}
            <FormInput
              label="Precio"
              name="price"
              register={register}
              errors={errors}
              inputProps={{
                type: "number",
                step: "0.01",
                min: 0,
                placeholder: "0.00",
                disabled: mode === "view",
              }}
            />
          </div>
          {/* costo */}
          <div className="grid gap-2">
            {/* <FormInput
              type="number"
              label="Costo"
              name="cost"
              placeholder="900"
              register={(name) => register(name, { valueAsNumber: true })}
              errors={errors}
              inputProps={{
                type: "number",
                step: "0.01",
                min: 0,
                placeholder: "0.00",
              }}
            /> */}
            <FormInput
              label="Costo"
              name="cost"
              register={register}
              errors={errors}
              inputProps={{
                type: "number",
                step: "0.01",
                min: 0,
                placeholder: "0.00",
                disabled: mode === "view",
              }}
            />
          </div>
        </div>
      </div>

      {/* descripcion */}
      <div className="grid gap-2">
        <Label>Descripción</Label>
        {/* Rich Text con Tiptap */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value || ""}
              onChange={field.onChange}
              disabled={mode === "view"}
            />
          )}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      {/* input images */}
      <div className="grid gap-2">
        <Label>Imágenes del producto</Label>
        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <InputFile
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              error={errors.images?.message}
              maxFiles={5}
              maxSizeMB={5}
              imgExisting={initialData?.imageExisting}
              setValue={setValue}
              disabled={mode === "view"}
            />
          )}
        />
      </div>
    </form>
  );
};

export default FormProduct;
