import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
//context de la branch
import { useBranch } from "@/context/BranchContext";

const LayoutDashboard = () => {
  const { nameCBranch } = useBranch();
  return (
    <SidebarProvider>
      <AppSidebar className="bg-gray-900" />

      {/* SidebarInset con flex y altura completa */}
      <SidebarInset className="flex flex-col overflow-hidden">
        {/* HEADER - Fijo */}
        <header className="flex h-12 shrink-0 items-center gap-2 border-b bg-white">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-lg font-medium leading-tight font-title">
              {nameCBranch
                ? `Estas Trabajando en el contexto de la ${nameCBranch}`
                : "Estás trabajando en la Vista Global"}
            </h1>
          </div>
        </header>

        {/* CONTENIDO - Sin overflow-auto, solo flex-1 */}
        <div className="flex-1 min-h-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutDashboard;
