import { TrendingUp, TrendingDown } from "lucide-react";
import "@/reports/styleReport.css";

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
    <div className="card-report-content">
      {/* Badge de porcentaje */}
      <div className="header-card">
        {Icon && <Icon className={`w-5 h-5`} />}
        <div
          className={`badge-card ${
            isPositive ? "badge-positive" : "badge-negative"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {percentage}
        </div>
      </div>

      {/* Título */}
      <h3 className={`text-sm font-title mb-2 text-foreground`}>{title}</h3>

      {/* Valor principal */}
      <div className="mb-1 flex gap-2 items-center">
        <p className={`text-2xl font-bold text-foreground`}>{value}</p>
        {/* Subtítulo */}
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
};
