import "@/reports/styleReport.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { SalesDataDayMonth } from "../types/daysType";
import { Button } from "@/components/ui/button";

// Componente para el Tooltip personalizado (el cuadro flotante)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-4 shadow-lg rounded-xl border border-ring/10">
        <p className="text-xs font-bold text-card-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 py-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-muted-foreground font-medium">
              {entry.name}:
            </span>
            <span className="text-xs font-bold text-card-foreground">
              {entry.value.toLocaleString("es-BO", {
                style: "currency",
                currency: "BOB",
              })}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface Props {
  data: SalesDataDayMonth[] | undefined;
  day: boolean;
  setRange: (range: "5days" | "5months") => void;
  range: "5days" | "5months";
}

export function SalesHistoryChart({ data, day, setRange, range }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[350px] w-full rounded-xl border bg-background p-4 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          No existe información disponible
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full rounded-xl border border-ring/10 bg-card p-3 shadow-sm
    md:p-6"
    >
      <div
        className="mb-6 flex flex-col items-center justify-between gap-5
      md:flex-row md:justify-between w-full"
      >
        <h3
          className="text-base font-title font-semibold text-card-foreground
        md:text-lg"
        >
          Historial de Ventas
          <span
            className="ml-1 text-xs text-muted-foreground font-semibold
          md:text-sm"
          >
            {day ? "(Últimos 5 días)" : "(Últimos 5 meses)"}
          </span>
        </h3>

        <div className="flex items-center justify-center gap-10">
          <Button
            onClick={() => setRange("5days")}
            className={`transition-all ${
              range === "5days"
                ? "button-graph-active"
                : "button-graph-inactive"
            }`}
          >
            5 Días
          </Button>
          <Button
            onClick={() => setRange("5months")}
            className={`transition-all ${
              range === "5months"
                ? "button-graph-active"
                : "button-graph-inactive"
            }`}
          >
            5 Meses
          </Button>
        </div>
      </div>

      <div className="w-full h-[300px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 320 }}
          aspect={undefined}  
        >
          <LineChart
            data={data}
            margin={{ top: 10, right: 5, left: 0, bottom: 10 }} // Cambia estos márgenes
          >
            <defs>{/* Esto crea un ligero degradado bajo las líneas*/}</defs>

            {/* Grid horizontal */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="sale_date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              dy={10}
              tickFormatter={(val) =>
                day ? val.split("-").slice(1).reverse().join("/") : val
              }
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#94a3b8" }}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Configuración de las Líneas */}
            <Line
              type="monotone"
              dataKey="total_sold"
              name="Vendido"
              stroke="#6366f1"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="total_cash"
              name="Cobrado"
              stroke="#10b981"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="total_debt"
              name="Deuda"
              stroke="#f43f5e"
              strokeWidth={4}
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />

            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              iconSize={12}
              wrapperStyle={{
                paddingTop: "1rem",
                color: "#0f172a",
                fontWeight: "600",
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
              formatter={(value) => (
                <span
                  className="text-xs sm:text-sm md:text-base"
                  style={{ color: "#0f172a" }}
                >
                  {value}
                </span>
              )}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
