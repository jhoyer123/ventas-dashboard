import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  subtitle?: string;
  percentage: string;
  isPositive: boolean;
  colorScheme: "cardNormal" | "cardDebt";
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  smallValue?: string;
}

export const MetricCard = ({
  title,
  value,
  subtitle,
  percentage,
  isPositive,
  colorScheme,
  icon: Icon,
  smallValue,
}: Props) => {
  const colorStyles = {
    cardNormal: {
      bg: "text-black bg-background shadow-md border ",
      badge: "bg-green-100 text-green-800",
      icon: "text-gray-800",
    },
    cardDebt: {
      bg: "bg-blue-900 text-white shadow-md",
      badge: "bg-red-500 text-white",
      icon: "text-white",
    },
  };

  const styles = colorStyles[colorScheme];

  return (
    <div
      className={`relative ${styles.bg} rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50`}
    >
      {/* Badge de porcentaje */}
      <div
        className={`flex items-center justify-between mb-4 ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${styles.badge} text-xs font-semibold`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {percentage}
        </div>
        {Icon && <Icon className={`w-5 h-5 ${styles.icon}`} />}
      </div>

      {/* Título */}
      <h3
        className={`text-sm font-medium mb-2 ${
          colorScheme === "cardNormal" ? "text-black" : "text-white"
        }`}
      >
        {title}
      </h3>

      {/* Valor principal */}
      <div className="mb-1">
        <p
          className={`text-2xl font-bold ${
            colorScheme === "cardNormal" ? "text-black" : "text-white"
          }`}
        >
          {value}
        </p>
      </div>

      {/* Subtítulo */}
      {subtitle && <p className={`text-xs"}`}>{subtitle}</p>}

      {/* Valor pequeño adicional */}
      {smallValue && (
        <p
          className={`text-xs mt-2 ${
            colorScheme === "cardNormal"
              ? ""
              : "text-slate-400 dark:text-slate-500"
          }`}
        >
          {smallValue}
        </p>
      )}
    </div>
  );
};
