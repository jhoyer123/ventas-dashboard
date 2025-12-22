export interface queryParams {
  page: number; // base 1
  limit: number;
  search?: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  branchId?: string | null;
}
