// Convierte un número en formato de moneda boliviana
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: "BOB",
  }).format(amount);
};
// Convierte una fecha en un formato legible con día, mes, año, hora y minutos de bolivia
export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-BO", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};
