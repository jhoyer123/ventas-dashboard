import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//iport del schema y el type
import { categorySchema, type categoryInput } from "@/types/category";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";

interface props {
  funSubParent: (data: categoryInput) => void;
}

export const FormCategory = ({ funSubParent }: props) => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data: categoryInput) => {
    console.log(data);
    funSubParent(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id="form-category">
        <Label>Nombre de la categoria</Label>
        <Input {...register("nameCat")} placeholder="ejemplo laptops" />
      </form>
    </div>
  );
};
