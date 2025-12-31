import { useRepDays } from "@/reports/hooks/graphic/useGetInfoDays";
import { useMemo, useState } from "react";
import { useRepMonths } from "./useGetInfoMonth";

export type TimeRange = "5days" | "5months";
//personal hook para traer los datos por dias (ejl: ultimos 7 dias)
export const useInfoDM = ({
  currentBranch,
}: {
  currentBranch: string | null;
}) => {
  //estado para cambiar de dias a meses
  const [range, setRange] = useState<TimeRange>("5days");

  // --- Lógica de fechas para Días ---
  const dates = useMemo(() => {
    const today = new Date();
    const past = new Date();
    if (range === "5days") past.setMonth(today.getMonth() - 5);
    else past.setDate(today.getDate() - 5);
    return { from: past.toISOString(), to: today.toISOString() };
  }, []);

  //usamos el hook de dias
  const { data: dataDays } = useRepDays({
    input: {
      from_date: dates.from,
      to_date: dates.to,
      branch_id: currentBranch,
    },
    enable: range === "5days",
  });

  //usamos el hook de meses
  const { data: dataMonths } = useRepMonths({
    input: {
      from_date: dates.from,
      to_date: dates.to,
      branch_id: currentBranch,
    },
    enable: range === "5months",
  });

  //retornamos los datos
  return {
    data: range === "5days" ? dataDays : dataMonths,
    setRange,
    range,
  };
};
