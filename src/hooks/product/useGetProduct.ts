import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";
//type employee
import { type Product } from "@/types/product";
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
  return useQuery<PaginatedResponse<Product>, Error>({
    queryKey: [
      "products",
      tableState.apiParams.page,
      tableState.apiParams.limit,
      tableState.apiParams.search,
      tableState.apiParams.sortField,
      tableState.apiParams.sortOrder,
      branchId,
    ],

    queryFn: () => getProducts(paramsServer, branchId),

    retry: false,
  });
};

export default useGetEmployee;
