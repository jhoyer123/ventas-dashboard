import { type ColumnDef } from "@tanstack/react-table";
import { type Employee } from "@/types/employee"; // Asegúrate que esta ruta es correcta

// --- COLUMNAS ---
export const columnsPersonal: ColumnDef<Employee>[] = [
  // ... otras columnas ...
  {
    accessorKey: "name",
    header: "Nombre",
    enableSorting: true,
  },
  {
    accessorKey: "cedula",
    header: "Cédula",
    enableSorting: true,
  },
  {
    accessorKey: "position",
    header: "Posición",
    enableSorting: true,
  },
  {
    // Columna especial para formato de fecha
    accessorKey: "birthDate",
    header: "Nacimiento",
    enableSorting: true,
    cell: (info) => {
      // Si la fecha viene como string ISO del backend, la formateamos
      const dateValue = info.getValue() as string;
      if (!dateValue) return "";

      try {
        return new Date(dateValue).toLocaleDateString("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      } catch (e) {
        return dateValue; // Muestra el valor crudo si falla el parseo
      }
    },
  },
  // OPCIONAL: Columna para la relación de Sucursal (Branch)
  {
    accessorKey: "branch.name", // Esto permite acceder a branch.name en la fila
    header: "Sucursal",
    enableSorting: true, // Esto ordenará por el campo 'branch.name'
    cell: (info) => info.row.original.branch?.name ?? "N/A",
  },
];
