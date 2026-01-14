import { MapPin, Users, Building2, Calendar, Box, Hash } from "lucide-react";
import { DropDownAction } from "@/components/common/DropDownAction";
import type { BranchOutput } from "@/types/branch";
/* icons */
import { Pencil, Trash2 } from "lucide-react";
import "@/components/branch/stylesBranches.css";

interface Props {
  branches: BranchOutput[] | undefined;
  setBranchS: React.Dispatch<React.SetStateAction<BranchOutput | undefined>>;
  handleOpenModal: () => void;
  handleOpenAlertDelete: () => void;
}

export const Branches = ({
  branches,
  setBranchS,
  handleOpenModal,
  handleOpenAlertDelete,
}: Props) => {
  return (
    <div className="container-branches">
      {/* grid de sucursales */}
      <div className="branches-content">
        {branches?.map((sucursal) => (
          <div
            key={sucursal.id}
            className={`rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition text-card-foreground space-y-4 flex flex-col justify-between`}
          >
            {/* Card header */}
            <div
              className={`flex items-center justify-between gap-3 p-2 border-0`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="p-2 rounded-lg text-popover shrink-0 bg-primary/70">
                  <Building2 size={18} />
                </div>

                <h3 className="font-title text-sm truncate">
                  {sucursal.branch_name}
                </h3>
              </div>

              <DropDownAction
                items={[
                  {
                    label: "Actualizar información",
                    action: () => {
                      setBranchS(sucursal);
                      handleOpenModal();
                    },
                    icon: Pencil,
                  },
                  {
                    label: "Eliminar",
                    action: () => {
                      setBranchS(sucursal);
                      handleOpenAlertDelete();
                    },
                    icon: Trash2,
                  },
                ]}
              />
            </div>

            {/* Card body */}
            <div className="py-2 px-3">
              {/* Address */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span className="line-clamp-2">{sucursal.address}</span>
              </div>
            </div>

            {/* Footer info */}
            <div className="flex flex-col gap-3 items-center justify-between text-sm p-2 bg-chart-3 rounded-b-lg text-brand-foreground">
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-1.5">
                  <Users size={14} />
                  <span>{sucursal.total_employees || 0} empleados</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Box size={14} />
                  <span>{sucursal.total_products || 0} productos</span>
                </div>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>
                    {new Date(sucursal.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Hash size={14} />
                  <span>Cod. {sucursal.code}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
