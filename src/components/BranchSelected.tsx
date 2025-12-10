import * as React from "react";
import { Building2, ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
//import hoook get branches
import { useGetBranches } from "@/hooks/branch/useGetBranches";
//types de branches
import type { BranchOutput } from "@/types/branch";
//contexto del branch para obtener la sucursal actual
import { useBranch } from "@/context/BranchContext";

export function BranchSelected() {
  //logica del sidebar responsive
  const { isMobile } = useSidebar();

  //funcion para cambiar el id de la sucursal en el contexto
  const { setBranchId } = useBranch();

  //logica de obtención de sucursales
  const { data: branches } = useGetBranches();
  //brach activa
  const [brachActive, setBranchActive] = React.useState<BranchOutput>();
  //funcion para cambiar la sucursal activa y actualizar el contexto
  const handleSetBranch = (branchId: string | null, branch?: BranchOutput) => {
    setBranchId(branchId);
    setBranchActive(branch);
  };
  //console.log("Sucursal activa:", brachActive);
  if (!branches) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mt-2"
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Building2 className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {!brachActive ? "Vista Global" : brachActive.branchName}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Sucursales Existentes
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleSetBranch(null, undefined)}>
              Vista Global
              <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
            </DropdownMenuItem>
            {branches?.map((branch /* index */) => (
              <DropdownMenuItem
                key={branch.branchName}
                onClick={() => handleSetBranch(branch.id, branch)}
                className="gap-2 p-2"
              >
                {branch.branchName}
                <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="text-muted-foreground font-medium">
                Se vera la Información de la opcion seleccionada
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
