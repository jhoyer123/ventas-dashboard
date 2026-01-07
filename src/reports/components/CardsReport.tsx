import { BanknoteX, DollarSign, ShoppingCart, Wallet } from "lucide-react";
import { MetricCard } from "./MetricCard";
import type { CardsType } from "../types/daysType";

//para cantidades monetarias
const formatCurrency = (value: number) => {
  return `Bs ${value.toLocaleString("es-BO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
//para numeros enteros
const formatNumber = (value: number) => {
  return value.toLocaleString("es-BO");
};

export const CardsReport = ({ data }: { data: CardsType }) => {
  return (
    <div className="h-auto dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1">
              Reporte de Ventas Diarias y Resumenes mensuales
            </h1>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* monto total ventas del dia)*/}
          <MetricCard
            title="Monto Total Recibido hoy"
            value={formatCurrency(data.cash_received_amount)}
            subtitle=""
            percentage="+2.5%"
            isPositive={true}
            colorScheme="cardNormal"
            icon={DollarSign}
          />

          {/* Monto total recibido del dia */}
          <MetricCard
            title="Total descuentos aplicados hoy"
            value={formatCurrency(data.total_discounts)}
            subtitle=""
            percentage="+7.9%"
            isPositive={true}
            colorScheme="cardNormal"
            icon={Wallet}
          />

          {/* Total de ventas completadas */}
          <MetricCard
            title="Total ventas realizadas hoy"
            value={formatNumber(data.total_sales_count)}
            subtitle=""
            percentage="+15.6%"
            isPositive={true}
            colorScheme="cardNormal"
            icon={ShoppingCart}
          />

          {/* Total de descuentos del dia */}
          <MetricCard
            title="Deuda total pendiente general  "
            value={formatCurrency(data.total_pending_debt)}
            subtitle=""
            percentage="-3.2%"
            isPositive={false}
            colorScheme="cardDebt"
            icon={BanknoteX}
          />
        </div>
      </div>
    </div>
  );
};
