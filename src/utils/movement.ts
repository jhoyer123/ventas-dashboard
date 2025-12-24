//funcion para tradiucir el tipo de movimiento
export const translateMovementType = (type: string) => {
  switch (type) {
    case "INCOMING":
      return "Entrada";
    case "OUTGOING":
      return "Salida";
    case "TRANSFER":
      return "Transferencia";
    default:
      return type;
  }
};

//funcion para obtener la sucursal segun el tipo de movimiento
export const getBranchName = (
  type: string,
  branch_from_name: string | null,
  branch_to_name: string | null
) => {
  switch (type) {
    case "INCOMING":
      // Cuando es entrada, normalmente viene de otra sucursal
      return branch_to_name || "-";
    case "OUTGOING":
      // Cuando es salida, se muestra la sucursal de origen
      return branch_from_name || "-";
    case "TRANSFER":
      // Transferencia, mostrar ambas sucursales
      return `${branch_from_name || "-"} → ${branch_to_name || "-"}`;
    default:
      return "-";
  }
};
