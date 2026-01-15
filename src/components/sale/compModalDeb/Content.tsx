import {
  User,
  CreditCard,
  Building2,
  Calendar,
  DollarSign,
  Tag,
} from "lucide-react";
//import utils para formatear moneda y fecha
import { formatCurrency, formatDate } from "@/utils/dataFormat";
import type { SaleH } from "@/types/saleh";
import { getPaymentMethod, getStatusBadge } from "../ModalDetSale";

interface Props {
  sale: SaleH;
}

export const Content = ({ sale }: Props) => {
  return (
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
            {sale.branch_name}
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
              {sale.employee_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
