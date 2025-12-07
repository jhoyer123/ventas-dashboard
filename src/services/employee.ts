import api from "@/api/api";
import { type Employee } from "../types/employee";
import { type ServerTableParams } from "../tabla/useServerTableState";
import type { PaginatedResponse } from "@/tabla/api";

//traer todos los empleados
export const getEmployees = async (
  params: ServerTableParams
): Promise<PaginatedResponse<Employee>> => {
  try {
    const urlParams = new URLSearchParams(
      params as unknown as Record<string, string>
    );
    const response = await api.get(`employees?${urlParams.toString()}`);
    return response.data;
    //console.log(response.data);
  } catch (error: any) {
    throw error;
  }
};
