import { type ColumnDef } from "@tanstack/react-table";
import { type CategoryType } from "@/types/category";
import { Pencil, Trash2, Eye /* Calendar */ } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface props {
  setOpenEdit: (empleado: CategoryType) => void;
  setOpenView: (empleado: CategoryType, disable: boolean) => void;
  setOpenDelete: (empleado: CategoryType) => void;
  setMode: (mode: "create" | "update" | "view") => void;
}

export const columnsCategory = ({
  setOpenEdit,
  setOpenDelete,
  setMode,
}: props): ColumnDef<CategoryType>[] => [
  {
    accessorKey: "nameCat",
    header: "Nombre Categoría",
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: "Descripción",
    enableSorting: false,
    cell: ({ row }) => {
      const description = row.original.description;
      return (
        <div className="max-w-sm truncate" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    accessorKey: "total_products",
    header: "Productos Asociados",
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setMode("view");
                setOpenEdit(category);
              }}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              <span>Ver detalles</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                setMode("update");
                setOpenEdit(category);
              }}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                setOpenDelete(category);
              }}
              className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Eliminar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
