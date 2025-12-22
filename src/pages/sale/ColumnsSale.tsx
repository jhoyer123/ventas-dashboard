import { type SaleH } from "@/types/saleh";
import { type ColumnDef } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CreditCard, Eye, FilePlus, MoreHorizontal } from "lucide-react";
import type { typeMS } from "@/hooks/sale/hookslogic/useModalsState";

interface Props {
  openM: (type: typeMS) => void;
}

export const columnsSaleH = ({ openM }: Props): ColumnDef<SaleH>[] => [
  {
    accessorKey: "clientName",
    header: "Cliente",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-gray-600 font-mono text-sm">
        {row.original.clientName}
      </span>
    ),
  },
  {
    accessorKey: "userName",
    header: "Vendedor",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-gray-600 font-mono text-sm">
        {row.original.userName}
      </span>
    ),
  },
  {
    accessorKey: "finalAmount",
    header: "Monto Cobrado",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-gray-600 font-mono text-sm">
        {row.original.finalAmount}
      </span>
    ),
  },
  {
    accessorKey: "debtAmount",
    header: "Deuda",
    enableSorting: true,
  },
  {
    accessorKey: "created_at",
    header: "Fecha de Venta",
    enableSorting: true,
    //aqui deberiamos convertir la fecha a un formato mas legible
    cell: ({ row }) => (
      <span className="text-gray-600 font-mono text-sm">
        {new Date(row.original.created_at).toLocaleDateString("es-BO", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const sale = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
              <span className="sr-only">Abrir menú</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => openM({ typeModal: "details", sale })}
            >
              <Eye className="w-4 h-4 mr-2" /> Ver Detalles
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FilePlus />
              generar recibo
            </DropdownMenuItem>
            {sale.debtAmount !== 0 && (
              <DropdownMenuItem
                onClick={() => openM({ typeModal: "debtPayment", sale })}
              >
                <CreditCard />
                Completar Pago
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
