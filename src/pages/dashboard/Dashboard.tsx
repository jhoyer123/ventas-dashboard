//import styles from "./Dashboard.module.css";
import { CardsReport } from "@/reports/components/CardsReport";
import { SalesHistoryChart } from "@/reports/components/GraficDays";
import { useInfoCards } from "@/reports/hooks/cards/useInfoCards";
import { useInfoDM } from "@/reports/hooks/graphic/useInfoDM";
import { useTop } from "@/reports/hooks/top/useTop";
import { useTopB } from "@/reports/hooks/top/useTopB";
//context de la sucursal
import { useBranch } from "@/context/BranchContext";
import { TableTop } from "@/reports/components/TableTop";
import { SkeletonCard } from "@/components/common/SkeletonCard";

const Dashboard = () => {
  const { currentBranch } = useBranch();
  //hook de las cards
  const { data: dataCards, isLoading } = useInfoCards({ currentBranch });
  //hooks para la info por dias y por meses
  const { data: dataDM, setRange, range } = useInfoDM({ currentBranch });
  //hook de top products
  const { topProducts } = useTop({ currentBranch });
  //hook de top branches
  const { topBranches } = useTopB();

  return (
    <div className="min-h-full p-4 w-full bg-background-view">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <h1
          className="font-title text-xl text-foreground
        lg:text-2xl"
        >
          Resumen Operativo
        </h1>

        <CardsReport data={dataCards} />
        {/* Cabecera con selector */}
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Tendencias</h2>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setRange("5days")}
                className={`px-3 py-1 text-sm rounded-md transition-all ${
                  range === "5days"
                    ? "bg-white shadow text-black"
                    : "text-gray-500"
                }`}
              >
                5 Días
              </button>
              <button
                onClick={() => setRange("5months")}
                className={`px-3 py-1 text-sm rounded-md transition-all ${
                  range === "5months"
                    ? "bg-white shadow text-black"
                    : "text-gray-500"
                }`}
              >
                5 Meses
              </button>
            </div>
          </div>
          <SalesHistoryChart data={dataDM} day={range === "5days"} />
        </div>
        <div className="flex flex-col gap-5 ">
          {/* top table products */}
          <div className="w-full md:w-1/2">
            <TableTop
              title="Productos Más Vendidos"
              data={topProducts}
              columns={[
                { header: "Producto", accessor: "title" },
                { header: "Cant. Vendida", accessor: "amount" },
              ]}
            />
          </div>
          {/* top table branches */}
          <div className="w-full md:w-1/2">
            <TableTop
              title="Sucursales que más venden"
              data={topBranches}
              columns={[
                { header: "Sucursal", accessor: "title" },
                { header: "Cant. Vendida", accessor: "amount" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* loading data */}
      {isLoading && <SkeletonCard />}
    </div>
  );
};

export default Dashboard;
