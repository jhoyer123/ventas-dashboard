import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Shadcn components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
//type actegory
import type { categoryType } from "@/types/category";
//type product
import {
  productFormSchema,
  type ProductFormInput,
  type productInputService,
} from "@/types/product";
import { Button } from "../ui/button";
import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

interface CreateProductProps {
  categories: categoryType[];
  funParent: (data: productInputService) => void;
  initialData?: ProductFormInput;
}

const FormProduct = ({
  categories,
  funParent,
  initialData,
}: CreateProductProps) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductFormInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialData || {
      activo: true, // por ejemplo
      categoryId: "",
    },
  });

  // Función helper para transformar los datos
  function transformProductData(data: ProductFormInput) {
    return {
      ...data,
      price: parseFloat(data.price),
      cost: parseFloat(data.cost),
      images: Array.from(data.images),
    };
  }

  //estado para las imagenes
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const onSubmit = (data: ProductFormInput) => {
    // Transforma los datos manualmente después de la validación del formulario
    const transformedData = transformProductData(data);
    console.log("Datos transformados:", transformedData);
    funParent(transformedData);
    reset();
    setPreviewImages([]);
    setSelectedImages([]);
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = selectedImages.filter((_, i) => i !== index);
    const newPreviews = previewImages.filter((_, i) => i !== index);

    setSelectedImages(newFiles);
    setPreviewImages(newPreviews);

    // Muy importante actualizar hook form
    setValue("images", newFiles as any, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto grid gap-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nombre del producto */}
        <div className="grid gap-2">
          <Label>Nombre del Producto</Label>
          <Input {...register("nameProd")} placeholder="Ej: Laptop Gamer" />
          {errors.nameProd && (
            <p className="text-sm text-red-500">{errors.nameProd.message}</p>
          )}
        </div>
        {/* Marca */}
        <div className="grid gap-2">
          <Label>Marca</Label>
          <Input {...register("brand")} placeholder="Ej: Samsung" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* SKU */}
        <div className="grid gap-2">
          <Label>SKU (Código Único)</Label>
          <Input {...register("sku")} placeholder="Ej: PROD-00123" />
          {errors.sku && (
            <p className="text-sm text-red-500">{errors.sku.message}</p>
          )}
        </div>
        {/* Categoría */}
        <div className="grid gap-2">
          <Label>Categoría</Label>
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((c) => (
                    <SelectItem value={c.id} key={c.id}>
                      {c.nameCat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.categoryId && (
            <p className="text-sm text-red-500">{errors.categoryId.message}</p>
          )}
        </div>
      </div>

      {/* Precio + Costo */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label>Precio</Label>
          <Input type="number" {...register("price")} placeholder="1200" />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>Costo</Label>
          <Input type="number" {...register("cost")} placeholder="900" />
          {errors.cost && (
            <p className="text-sm text-red-500">{errors.cost.message}</p>
          )}
        </div>
      </div>

      {/* descripcion */}
      <div>
        <Label>Descripción</Label>
        {/* Rich Text con Tiptap */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <RichTextEditor
              value={field.value || ""}
              onChange={field.onChange}
            />
          )}
        />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      {/* activar o desactivar producto */}
      <div className="grid gap-2">
        <div className="flex items-center gap-2">
          <input id="activo" type="checkbox" {...register("activo")} />
          <label htmlFor="activo" className="text-sm font-medium">
            Activo (visible en catálogo)
          </label>
        </div>
        <p className="text-xs text-gray-500">
          Desactiva para ocultar este producto en la tienda sin borrarlo.
        </p>
      </div>

      {/* input para subir imagenes */}
      <div className="grid gap-2">
        <Label>Imágenes del producto</Label>
        <p className="text-xs text-red-500">Debes subir al menos una imagen.</p>
        <Input
          type="file"
          accept="image/*"
          multiple
          {...register("images")}
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            setSelectedImages(files);
            const urls = files.map((file) => URL.createObjectURL(file));
            setPreviewImages(urls);
          }}
        />

        {/* {errors.images && (
          <p className="text-sm text-red-500">{errors.images.message}</p>
        )} */}
      </div>
      {/* previsualización de imágenes */}
      {previewImages.length > 0 && (
        <div className="flex gap-4 flex-wrap">
          {previewImages.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                className="w-24 h-24 object-cover rounded-md border"
              />

              {/* Botón eliminar */}
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-xs"
                onClick={() => handleRemoveImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}

      {/*botones */}
      <div className="flex gap-4 w-full justify-between mt-4">
        {/* boton de cancelar y volver */}
        <Button type="button" className="cursor-pointer" variant="outline">
          Cancelar
        </Button>

        {/* Botón de enviar */}
        <Button type="submit" className="cursor-pointer">
          Crear Producto
        </Button>
      </div>
    </form>
  );
};

export default FormProduct;
