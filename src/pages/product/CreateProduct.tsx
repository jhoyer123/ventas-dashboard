import FormProduct from "@/components/product/FormProduct";
//import del hook get category
import { useGetCategory } from "@/hooks/category/useGetcategory";
//hook de creacion
import { useCreateProduct } from "@/hooks/product/useCreateProduct";
import { toast } from "sonner";
//type product para el input service
import type { ProductInputService } from "@/schemes/product";
//service que trae el producto por id
import { useGetProductById } from "@/hooks/product/useGetProductById";
//import para poder leer parametros de la url
import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
//types PridductSupT para el service update y product type para el form
//porque form maneja FlieList y el service maneja array de File
import type { ProductSupT, ProductType, ProductImage } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useUpdateProduct } from "@/hooks/product/useUpdateProduct";
import { useNavigate } from "react-router-dom";

interface Props {
  mode?: "create" | "update" | "view";
}

const CreateProduct = (mode: Props) => {
  const navigate = useNavigate();
  //obtenemos las categorias
  const { data: categories } = useGetCategory();
  //hook creacion y actualización
  const create = useCreateProduct();
  const update = useUpdateProduct();
  //obtenemos el id de la url / logica del update
  const params = useParams();
  const { id } = params;
  const { data, isLoading, error } = useGetProductById(id || "");

  // A menos que 'data' de la query cambie realmente.
  const dataPrepared = useMemo(() => {
    if (!data) return undefined;

    // Solo mapeamos si data existe
    const imagesProd =
      data.product_images?.map((img: ProductImage) => img.image_url) || [];

    return {
      ...data,
      imageExisting: imagesProd,
      images: undefined, // Asegurar que FileList es undefined en la inicialización
    } as ProductType;
  }, [data]);

  const handleSubmit = (productData: ProductSupT) => {
    let promise;
    if (id) {
      //logica de actualización
      promise = update.mutateAsync({ id, data: productData });
    } else {
      //logica de creación
      const dataService: ProductInputService = {
        categoryId: productData.categoryId,
        nameProd: productData.nameProd,
        slug: productData.slug,
        price: productData.price,
        cost: productData.cost,
        description: productData.description,
        brand: productData.brand,
        images: productData.images,
        sku: productData.sku,
      };
      promise = create.mutateAsync(dataService);
    }
    toast.promise(promise, {
      loading: id ? "Actualizando producto..." : "Creando producto...",
      success: () => {
        navigate("/dashboard/products"); // Solo redirige si es update
        return id
          ? "Producto actualizado con éxito"
          : "Producto creado con éxito";
      },
      error: (err) =>
        id
          ? `Error al actualizar: ${err.message}`
          : `Error al crear: ${err.message}`,
      position: "top-right",
      duration: 3500,
    });
  };

  //verificamos si estamos en modo edicion tambien sirve para el modo view
  const isEditing = !!id;

  //MANEJO DE CARGA
  if (isEditing && isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Cargando Producto...</h1>
        {/* Spinner o indicador de carga */}
      </div>
    );
  }

  //MANEJO DE ERRORES
  if (isEditing && error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error al cargar el producto</h1>
        {/* Mostrar mensaje de error o componente de error */}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 w-full flex flex-col items-center justify-center my-auto">
      <div className="flex w-full justify-between mb-6">
        <h1 className="text-2xl font-bold text-center my-auto">
          {mode?.mode === "view"
            ? "Información del Producto"
            : isEditing
            ? "Editar Producto"
            : "Crear Nuevo Producto"}
        </h1>
        {/*botones */}
        <div className="flex gap-4 items-center justify-center">
          {mode?.mode === "view" ? (
            <div>
              <Button asChild className="cursor-pointer" variant="secondary">
                <Link to="/dashboard/products">Volver</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* boton de cancelar y volver */}
              <Button asChild className="cursor-pointer" variant="secondary">
                <Link to="/dashboard/products">Cancelar y volver</Link>
              </Button>

              {/* Botón de enviar */}
              <Button
                type="submit"
                className="cursor-pointer hover:bg-gray-800"
                form="product-form"
                variant="default"
              >
                {id ? "Actualizar Producto" : "Crear Producto"}
              </Button>
            </>
          )}
        </div>
      </div>
      {/* Formulario del producto */}
      <FormProduct
        categories={categories || []}
        funParent={handleSubmit}
        mode={mode?.mode === "view" ? "view" : isEditing ? "update" : "create"}
        initialData={id ? dataPrepared : undefined}
      />
    </div>
  );
};

export default CreateProduct;
