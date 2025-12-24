import { type ColumnDef } from "@tanstack/react-table";
//importar el tipo Movement
import { type Movement } from "@/types/movement";
//import de los iconos y componentes para el menu de acciones
import { MoreHorizontal, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
//importamos las utilidades de movement (funciones)
import { getBranchName, translateMovementType } from "@/utils/movement";

interface Props {
  openModal: (movement: Movement) => void;
}

export const columnsMovement = ({
  openModal,
}: Props): ColumnDef<Movement>[] => [
  {
    accessorKey: "type",
    header: "Tipo",
    enableSorting: true,
    cell: ({ row }) => translateMovementType(row.original.type),
  },
  {
    accessorKey: "employee_name",
    header: "Empleado",
    enableSorting: true,
  },
  {
    accessorKey: "name_prod",
    header: "Producto",
    enableSorting: true,
  },
  {
    accessorKey: "movedQuantity",
    header: "Cantidad Movida",
    enableSorting: true,
  },
  {
    accessorKey: "branch_from_name",
    header: "Sucursal",
    enableSorting: true,
    cell: ({ row }) => {
      const { type, branch_from_name, branch_to_name } = row.original;
      return getBranchName(type, branch_from_name, branch_to_name);
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const movement = row.original;

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

            <DropdownMenuItem onClick={() => openModal(movement)}>
              <Eye className="mr-2 h-4 w-4" />
              <span>Ver detalles</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
