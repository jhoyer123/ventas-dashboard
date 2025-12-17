import { type ColumnDef } from "@tanstack/react-table";
import { type Product } from "@/types/product";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye /* Calendar */,
  PackagePlus,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ColumnProps {
  setOpenDelete: (idProd: string) => void;
  setOpenM: () => void;
}

export const columnsProduct = ({
  setOpenDelete,
  setOpenM,
}: ColumnProps): ColumnDef<Product>[] => [
  //mostrar nombre y la primera imgane del array de imagenes
  {
    accessorKey: "nameProd",
    header: "Nombre Producto",
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          <img
            loading="lazy"
            src={row.original.product_images?.[0]?.image_url || ""}
            alt={row.original.nameProd}
            className="w-10 h-10 object-cover rounded"
          />
          <span className="font-medium text-gray-900">
            {row.original.nameProd}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "Codigo SKU",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-gray-600 font-mono text-sm">
        {row.original.sku}
      </span>
    ),
  },
  {
    accessorKey: "brand",
    header: "Marca",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        {row.original.brand || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Precio",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.price}</span>
    ),
  },
  {
    accessorKey: "cost",
    header: "Costo",
    enableSorting: true,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to={`/dashboard/viewp/${product.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                <span>Ver Detalles</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to={`/dashboard/editp/${product.id}`}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Editar</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={setOpenM}
              className="cursor-pointer"
            >
              <PackagePlus className="mr-2 h-4 w-4" />
              <span>Agregar a sucursal/es</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => setOpenDelete(product.id)}
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
