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
        {/* cards reports */}
        <CardsReport data={dataCards} />
        {/* grafic days or months */}
        <SalesHistoryChart
          data={dataDM}
          day={range === "5days"}
          setRange={setRange}
          range={range}
        />
        {/* top tables */}
        <div
          className="grid grid-cols-1 gap-4
        md:grid-cols-2"
        >
          {/* top table products */}
          <div className="w-full h-full">
            <TableTop
              title="Productos Más Vendidos"
              data={topProducts}
              columns={[
                { header: "Producto", accessor: "title" },
                { header: "Cant", accessor: "amount" },
              ]}
            />
          </div>
          {/* top table branches */}
          <div className="w-full h-full">
            <TableTop
              title="Sucursales que más venden"
              data={topBranches}
              columns={[
                { header: "Sucursal", accessor: "title" },
                { header: "Total", accessor: "amount" },
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
