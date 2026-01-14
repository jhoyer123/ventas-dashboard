import { type TopProductB } from "@/reports/types/tops";
import { Building2 } from "lucide-react";

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
    <div className="bg-card border border-xl rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="p-3 border-b border-light flex items-center justify-center">
        <h3 className="text-base font-title font-semibold text-card-foreground tracking-tight">
          {title}
        </h3>
      </div>

      <div className="overflow-x-auto">
        {/* Vista Desktop - Tabla normal */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-card border-b border-light">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider"
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
                  {/* Producto */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-4">
                      {item.image ? (
                        <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      ) : (
                        <div className="shrink-0 w-16 h-16 rounded-lg flex items-center justify-center bg-primary/70 text-popover">
                          <Building2 className="w-full h-lh" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-card-foreground">
                          {item.title}
                        </p>
                        {item.subtitle && (
                          <p className="text-sm text-card-foreground/60 mt-0.5">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3 text-center border-l border-light">
                    <span className="text-card-foreground text-sm font-semibold">
                      {item.amount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista Mobile - Cards apiladas */}
        <div className="md:hidden space-y-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-light rounded-lg p-3 hover:bg-background-secondary/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                {item.image ? (
                  <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="shrink-0 w-16 h-16 rounded-lg flex items-center justify-center bg-primary/70 text-popover">
                    <Building2 className="w-full h-lh" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-card-foreground">
                    {item.title}
                  </p>
                  {item.subtitle && (
                    <p className="text-xs text-card-foreground/60 mt-0.5">
                      {item.subtitle}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-light">
                    <span className="text-xs text-muted-foreground uppercase">
                      {columns[1]?.header}
                    </span>
                    <span className="text-sm font-semibold text-card-foreground">
                      {item.amount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
