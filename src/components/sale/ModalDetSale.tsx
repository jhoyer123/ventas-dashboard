import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Receipt,
  User,
  CreditCard,
  Building2,
  Calendar,
  DollarSign,
  Tag,
  CheckCircle2,
} from "lucide-react";
import type { SaleH } from "@/types/saleh";

interface SaleDetailsModalProps {
  sale: SaleH;
  open?: boolean;
  closeModal?: () => void;
}

//ESTE MODAL MUESTRA LOS DETALLES DE UNA VENTA REALIZADA
export const ModalDetSale = ({
  open,
  sale,
  closeModal,
}: SaleDetailsModalProps) => {
  // Convierte un número en formato de moneda boliviana
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
    }).format(amount);
  };
  // Convierte una fecha en un formato legible con día, mes, año, hora y minutos de bolivia
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-BO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };
  // Devuelve un badge visual para mostrar el estado de la venta con color y etiqueta
  const getStatusBadge = (status: string) => {
    //console.log("Status:", status);
    const statusConfig: Record<string, { label: string; color: string }> = {
      COMPLETED: { label: "COMPLETED", color: "bg-green-100 text-green-800" },
      PENDING: { label: "PENDING", color: "bg-yellow-100 text-yellow-800" },
      CANCELLED: { label: "CANCELLED", color: "bg-red-100 text-red-800" },
    };

    const config = statusConfig[status] || {
      label: status,
      color: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        <CheckCircle2 className="w-4 h-4" />
        {config.label}
      </span>
    );
  };
  //funcion que traduce el metodo de pago
  const getPaymentMethod = (method: string) => {
    const methods: Record<string, string> = {
      CASH: "Efectivo",
      CARD: "Tarjeta",
      TRANSFER: "Transferencia",
      QR: "Código QR",
    };

    return methods[method] || method;
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Detalles de Venta
          </DialogTitle>
          <DialogDescription>
            Información completa de la transacción #{sale.receiptNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Estado */}
          <div className="flex items-center justify-between pb-4 border-b">
            <span className="text-sm font-medium text-gray-500">Estado</span>
            {getStatusBadge(sale.status)}
          </div>

          {/* Información del Cliente */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              Información del Cliente
            </h3>
            <div className="grid grid-cols-2 gap-4 pl-6">
              <div>
                <p className="text-xs text-gray-500">Nombre</p>
                <p className="text-sm font-medium text-gray-900">
                  {sale.clientName}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">NIT</p>
                <p className="text-sm font-medium text-gray-900">
                  {sale.clientNit}
                </p>
              </div>
            </div>
          </div>

          {/* Detalles Financieros */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Detalles Financieros
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Original</span>
                <span className="text-sm font-medium">
                  {formatCurrency(sale.totalAmount)}
                </span>
              </div>
              {sale.discountAmount > 0 && (
                <div className="flex justify-between items-center text-red-600">
                  <span className="text-sm flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Descuento
                  </span>
                  <span className="text-sm font-medium">
                    -{formatCurrency(sale.discountAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <span className="text-base font-semibold text-gray-900">
                  Total Cobrado
                </span>
                <span className="text-xl font-bold text-green-600">
                  {formatCurrency(sale.finalAmount)}
                </span>
              </div>
              {sale.debtAmount > 0 && (
                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                  <span className="text-sm text-orange-600 font-medium">
                    Saldo Pendiente
                  </span>
                  <span className="text-sm font-bold text-orange-600">
                    {formatCurrency(sale.debtAmount)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Método de Pago */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                <CreditCard className="w-3 h-3" />
                Método de Pago
              </p>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {getPaymentMethod(sale.paymentMethod)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                <Building2 className="w-3 h-3" />
                Sucursal
              </p>
              <p className="text-sm font-medium text-gray-900">
                {sale.branchName}
              </p>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="space-y-3 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
              <div>
                <p className="flex items-center gap-1 mb-1">
                  <Calendar className="w-3 h-3" />
                  Fecha de Creación
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDate(sale.created_at)}
                </p>
              </div>
              <div>
                <p className="mb-1">Vendedor</p>
                <p className="text-sm font-medium text-gray-900">
                  {sale.userName}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DialogClose>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Receipt className="w-4 h-4 mr-2" />
            Imprimir Recibo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
