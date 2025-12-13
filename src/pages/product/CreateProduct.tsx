import FormProduct from "@/components/product/FormProduct";
//import del hook get category
import { useGetCategory } from "@/hooks/category/useGetategory";
//types import
import type { productInputService } from "@/types/product";
//hook de creacion
import { useCreateProduct } from "@/hooks/product/useCreateProduct";
import { toast } from "sonner";
//navegar
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { data: categories } = useGetCategory();
  //hook creacion
  const create = useCreateProduct();
  const navigate = useNavigate();

  const handleCreateProduct = (productData: productInputService) => {
    const promise = create.mutateAsync(productData);
    toast.promise(promise, {
      loading: "Creando producto...",
      success: "Producto creado con éxito",
      error: (err) => `Error al crear el producto: ${err.message}`,
      position: "top-right",
      duration: 3500,
    });
    //navigate("products");
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      <FormProduct categories={categories || []} funParent={handleCreateProduct}/>
    </div>
  );
};

export default CreateProduct;
