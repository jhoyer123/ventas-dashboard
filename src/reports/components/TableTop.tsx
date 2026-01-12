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
    <div className="bg-card border border-xl rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="p-3 border-b border-light flex items-center justify-center">
        <h3 className="text-base font-title font-semibold text-card-foreground tracking-tight">
          {title}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-card border-b border-light">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-3 py-3 text-[11px] font-bold text-muted-foreground uppercase font-body tracking-wider"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-light divide-x divide-light">
            {data.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-background-secondary/30 transition-colors group "
              >
                {/* Producto */}
                <td className="p-2 py-2 w-auto">
                  <div className="flex items-center justify-between gap-2 w-full">
                    {item.image && (
                      <div className="w-20 h-15 rounded-xl overflow-hidden border border-light group-hover:scale-105 transition-transform">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-20 h-15 object-cover"
                        />
                      </div>
                    )}
                    <div className="w-full pr-2">
                      <p className="text-sm font-bold tracking-tight w-full text-card-foreground/80 font-title">
                        {item.title}
                      </p>
                      {item.subtitle && (
                        <p className="text-xs text-card-foreground/60 font-body">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Mapeo dinámico de las columnas restantes */}
                <td className="py-8 p-2 text-center border-l border-light w-auto">
                  <span className="text-card-foreground text-sm font-semibold font-body">
                    {item.amount}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
