import * as React from "react";
import { Building2, ChevronsUpDown, Loader2 } from "lucide-react";

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
//contexto del branch para obtener la sucursal actual
import { useBranch } from "@/context/BranchContext";

export function BranchSelected() {
  const [isPending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);
  const { isMobile } = useSidebar();
  const { setBranchId, currentBranch, setNameCBranch } = useBranch();
  const { data: branches } = useGetBranches();

  const branchActive = React.useMemo(() => {
    return branches?.find((b) => b.id === currentBranch);
  }, [branches, currentBranch]);

  const handleSetBranch = (branch: any | null, e: Event) => {
    const selectedId = branch?.id ?? null;
    if (selectedId === currentBranch) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    setOpen(false);
    startTransition(() => {
      setBranchId(selectedId);
      setNameCBranch(branch?.branch_name ?? null);
    });
  };

  if (!branches) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mt-2"
            >
              {isPending ? (
                <Loader2 className="animate-spin size-4" />
              ) : (
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Building2 className="size-4" />
                </div>
              )}
              <span className="truncate block w-full">
                {!branchActive ? "Vista Global" : branchActive.branch_name}
              </span>
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

            <DropdownMenuItem onSelect={(e) => handleSetBranch(null, e)}>
              Vista Global
              <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
            </DropdownMenuItem>

            {branches?.map((branch) => (
              <DropdownMenuItem
                key={branch.id}
                onSelect={(e) => handleSetBranch(branch, e)}
                className="gap-2 p-2 overflow-hidden text-ellipsis"
              >
                {branch.branch_name}
                <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" disabled>
              <div className="text-muted-foreground font-medium text-xs">
                {isPending
                  ? "Actualizando..."
                  : "Información de la sucursal seleccionada"}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
