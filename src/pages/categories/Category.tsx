import { Button } from "@/components/ui/button";
//importamos el modal de creacion
import { ModalCategory } from "@/components/category/ModalCategory";
import { useState } from "react";
//importamos el hook para crear
import { useCreateCategory } from "@/hooks/category/useCreateCategory";
//importamos llos types
import type { categoryInput } from "@/types/category";
import { toast } from "sonner";

const Category = () => {
  //logica de estados
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  //logiac del hook
  const create = useCreateCategory();

  const handleSubmit = (data: categoryInput) => {
    console.log("promesaaa");
    const promise = create.mutateAsync(data);
    toast.promise(promise, {
      success: "La categoria se creo correctamente.",
      loading: "Creando categoria...",
      error: "Error al crear la categoria",
      position: "top-right",
      duration: 3500,
    });
    handleOpen();
  };

  return (
    <div>
      <h1>Lista de categorías</h1>
      <Button className="cursor-pointer" onClick={handleOpen}>
        Crear categoria
      </Button>
      {/* aqui abajo deberia estar la tabla de tanstack table */}
      pero no lo pongo porque no lo entiendo
      {/* modal de categori */}
      <ModalCategory
        isOpen={isOpen}
        setIsOpen={handleOpen}
        funSubParent={handleSubmit}
      />
      {/* alert de eliminacion */}
    </div>
  );
};

export default Category;
