import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";
//type employee
import { type Product } from "@/types/product";
import type { PaginatedResponse } from "@/components/common/tabla/api";
import type { ServerTableParams } from "@/components/common/tabla/useServerTableState";

const useGetEmployee = (
  tableState: ServerTableParams,
  branchId: string | null,
) => {
  const paramsServer = {
    pageIndex: tableState.page,
    pageSize: tableState.limit,
    globalFilter: tableState.search,
    sorting: tableState.sortField
      ? [
          {
            id: tableState.sortField,
            desc: tableState.sortOrder === "desc",
          },
        ]
      : [],
  };
  return useQuery<PaginatedResponse<Product>, Error>({
    queryKey: [
      "products",
      tableState.page,
      tableState.limit,
      tableState.search,
      tableState.sortField,
      tableState.sortOrder,
      branchId,
    ],

    queryFn: () => getProducts(paramsServer, branchId),

    retry: false,
  });
};

export default useGetEmployee;
