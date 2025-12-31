import { type TopProductB } from "@/reports/types/tops";

interface Column {
  header: string;
  accessor: string;
}

interface Props {
  title: string;
  columns: Column[];
  data: TopProductB[];
}

export const TableTop = ({ title, data, columns }: Props) => {
  return (
    <div className="bg-card border-default rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 hover:shadow-md">
      <div className="p-6 border-b border-light flex justify-between items-center">
        <h3 className="text-lg font-bold text-primary tracking-tight">
          {title}
        </h3>
        <button className="text-xs font-semibold text-info hover:underline">
          Ver todo
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background-secondary/50">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-6 py-4 text-[11px] font-bold text-muted uppercase tracking-widest"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-light">
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-background-secondary/30 transition-colors group"
              >
                {/* Primera Columna: Identidad del Producto */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {item.image ? (
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden border border-light group-hover:scale-105 transition-transform">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary-light/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/5">
                        {item.title.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-primary tracking-tight">
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p className="text-xs text-muted">{item.subtitle}</p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Mapeo dinámico de las columnas restantes */}
                {columns.slice(1).map((col, idx) => (
                  <td key={idx} className="px-6 py-4">
                    <span
                      className={`text-sm ${
                        col.accessor === "amount"
                          ? "font-bold text-primary"
                          : "text-secondary font-medium"
                      }`}
                    >
                      {/* Solución al error de tipado 'any' */}
                      {(item as any)[col.accessor]}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
