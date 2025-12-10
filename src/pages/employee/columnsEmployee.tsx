import { type ColumnDef } from "@tanstack/react-table";
import { type Employee } from "@/types/employee";
import { MoreHorizontal, Pencil, Trash2, Eye, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const columnsPersonal: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Nombre Completo",
    enableSorting: true,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3">
          {/* Avatar con iniciales */}
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold">
            {row.original.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>
          <span className="font-medium text-gray-900">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "cedula",
    header: "Cédula",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-gray-600 font-mono text-sm">
        {row.original.cedula}
      </span>
    ),
  },
  {
    accessorKey: "job_position",
    header: "Cargo",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        {row.original.job}
      </span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
    enableSorting: true,
    cell: ({ row }) => (
      <span className="text-gray-600">{row.original.phone}</span>
    ),
  },
  {
    accessorKey: "birthDate",
    header: "Fecha de Nacimiento",
    enableSorting: true,
    cell: ({ row }) => {
      const dateValue = row.original.birthDate;
      if (!dateValue) return <span className="text-gray-400">N/A</span>;

      try {
        const formattedDate = new Date(dateValue).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{formattedDate}</span>
          </div>
        );
      } catch (e) {
        return <span className="text-gray-400">{dateValue}</span>;
      }
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const employee = row.original;

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

            <DropdownMenuItem
              onClick={() => {
                // TODO: Implementar lógica de ver
                console.log("Ver empleado:", employee);
              }}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              <span>Ver detalles</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                // TODO: Implementar lógica de editar
                console.log("Editar empleado:", employee);
              }}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Editar</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                // TODO: Implementar lógica de eliminar
                console.log("Eliminar empleado:", employee);
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
