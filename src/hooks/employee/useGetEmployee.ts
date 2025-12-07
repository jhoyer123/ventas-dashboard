import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "@/services/employee";

const useGetEmployee = (tableState: any) => {
  return useQuery({
    queryKey: [
      "employees",
      tableState.apiParams.page,
      tableState.apiParams.limit,
      tableState.apiParams.search,
      tableState.apiParams.sortField,
      tableState.apiParams.sortOrder,
    ],
    queryFn: () => getEmployees(tableState.apiParams),
    retry: false,
  });
};

export default useGetEmployee;
