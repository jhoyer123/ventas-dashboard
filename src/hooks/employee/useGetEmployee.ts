import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "@/services/employeeService";
//type employee
import { type Employee } from "@/types/employee";
import type { PaginatedResponse } from "@/components/common/tabla/api";

const useGetEmployee = (tableState: any, branchId: string | null) => {
  //console.log("Table State in useGetEmployee:", tableState);
  const paramsServer = {
    pageIndex: tableState.apiParams.page,
    pageSize: tableState.apiParams.limit,
    globalFilter: tableState.apiParams.search,
    sorting: tableState.apiParams.sortField
      ? [
          {
            id: tableState.apiParams.sortField,
            desc: tableState.apiParams.sortOrder === "desc",
          },
        ]
      : [],
  };
  return useQuery<PaginatedResponse<Employee>, Error>({
    queryKey: [
      "employees",
      tableState.apiParams.page,
      tableState.apiParams.limit,
      tableState.apiParams.search,
      tableState.apiParams.sortField,
      tableState.apiParams.sortOrder,
      branchId,
    ],

    queryFn: () => getEmployees(paramsServer, branchId),

    retry: false,
  });
};

export default useGetEmployee;
