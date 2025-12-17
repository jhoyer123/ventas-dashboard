//hook para obtener las categorias para la tabla dinamica
import { useQuery } from "@tanstack/react-query";
//importamos el service de get
import { getCategoriesT } from "@/services/categoryServices";
//type employee
import { type CategoryType } from "@/types/category";
import type { PaginatedResponse } from "@/components/common/tabla/api";

const useGetCategoryT = (tableState: any, branchId: string | null) => {
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
  return useQuery<PaginatedResponse<CategoryType>, Error>({
    queryKey: [
      "categories",
      tableState.apiParams.page,
      tableState.apiParams.limit,
      tableState.apiParams.search,
      tableState.apiParams.sortField,
      tableState.apiParams.sortOrder,
      branchId,
    ],

    queryFn: () => getCategoriesT(paramsServer),

    retry: false,
  });
};

export default useGetCategoryT;
