import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { SalesDataDayMonth } from "../types/daysType";

export function SalesHistoryChart({
  data,
  day,
}: {
  data: SalesDataDayMonth[] | undefined;
  day: boolean;
}) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[350px] w-full rounded-xl border bg-background p-4 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          No existe información disponible de ventas
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border bg-background p-4">
      <h3 className="mb-4 text-sm font-semibold">
        Historial de ventas de los últimos {day ? "5 días" : "5 meses"}
      </h3>

      {/* Se agregó min-w-0 para evitar colapso en flexbox */}
      <div className="w-full min-w-0 h-[250px] sm:h-[280px] lg:h-80">
        {/* Se agregó minWidth={0} para silenciar el error de cálculo inicial */}
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              dataKey="sale_date"
              tick={{ fontSize: 11 }}
              stroke="#888888"
              tickFormatter={(value) => {
                if (!day) return value.slice(0, 7); // Formato YYYY-MM
                return value;
              }}
            />
            <YAxis tick={{ fontSize: 11 }} stroke="#888888" width={50} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value) => {
                if (typeof value === "number") {
                  return `Bs ${value.toLocaleString("es-BO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`;
                }
                return value;
              }}
              labelFormatter={(value) => {
                if (!day) return value.slice(0, 7);
                return value;
              }}
            />
            <Legend wrapperStyle={{ fontSize: "11px" }} iconSize={10} />
            <Line
              type="monotone"
              dataKey="total_sold"
              name="Vendido"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="total_cash"
              name="Cobrado"
              stroke="#16a34a"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="total_debt"
              name="Deuda"
              stroke="#dc2626"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
