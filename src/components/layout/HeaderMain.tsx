import { useBranch } from "@/context/BranchContext";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
//import { ThemeToggle } from "./ThemeToggle";

export const HeaderMain = () => {
  const { nameCBranch } = useBranch();

  //limpiar le nombre para evitar repetir la palabra sucursal
  const cleanName = nameCBranch
    ? nameCBranch.replace(/sucursal/i, "").trim()
    : "Global";

  return (
    <header className="flex h-auto shrink-0 px-4 py-2 items-center gap-2 border-b bg-background">
      <div className="flex items-center gap-1 h-full w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-1 data-[orientation=vertical]:h-full"
        />
        <span
          className="px-2 py-1 text-accent-foreground text-xs font-bold uppercase flex items-center justify-center text-ellipsis overflow-hidden white-space-nowrap
        sm:text-sm"
        >
          {nameCBranch ? (
            <span className="">
              <span className="text-chart-2">Estado operativo: </span>
              Sucursal {cleanName}
            </span>
          ) : (
            "Estado operativo gloval"
          )}
        </span>
        {/* <ThemeToggle /> */}
      </div>
    </header>
  );
};
