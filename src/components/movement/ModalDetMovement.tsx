import { type Movement } from "@/types/movement";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getBranchName } from "@/utils/movement";
import {
  User,
  Box,
  Calendar,
  Clipboard,
  ArrowUpCircle,
  ArrowDownCircle,
  Repeat,
} from "lucide-react";
import type { JSX } from "react";
import { formatDate } from "@/utils/dataFormat";

interface MovementDialogProps {
  movement: Movement;
  isOpen?: boolean;
  onClose?: () => void;
}

export function ModalDetMovement({
  movement,
  isOpen,
  onClose,
}: MovementDialogProps) {
  if (!movement) return null;

  const {
    type,
    employee_name,
    name_prod,
    movedQuantity,
    branch_from_name,
    branch_to_name,
    created_at,
    description,
  } = movement;

  // Solo 2 colores: Negro/Gris para texto, Azul para acentos
  const typeConfig: Record<string, { label: string; icon: JSX.Element }> = {
    INCOMING: {
      label: "Entrada de Inventario",
      icon: <ArrowDownCircle className="w-5 h-5" />,
    },
    OUTGOING: {
      label: "Salida de Inventario",
      icon: <ArrowUpCircle className="w-5 h-5" />,
    },
    TRANSFER: {
      label: "Transferencia entre Sucursales",
      icon: <Repeat className="w-5 h-5" />,
    },
    ADJUST: {
      label: "Ajuste de Inventario",
      icon: <Clipboard className="w-5 h-5" />,
    },
  };

  const config = typeConfig[type] || {
    label: type,
    icon: <Clipboard className="w-5 h-5" />,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[580px] p-0 gap-0 bg-white">
        {/* Header minimalista con solo una línea de separación */}
        <div className="px-8 pt-8 pb-6 border-b">
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2.5 rounded-lg bg-slate-900 text-white">
              {config.icon}
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl font-semibold text-slate-900 mb-1">
                {config.label}
              </DialogTitle>
              <DialogDescription className="text-sm text-slate-500">
                Detalles del movimiento registrado
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Contenido - Grid simple y limpio */}
        <div className="px-8 py-6">
          <div className="space-y-6">
            {/* Empleado */}
            <div className="flex items-start gap-4">
              <User className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Empleado
                </Label>
                <p className="mt-1 text-base text-slate-900 font-medium">
                  {employee_name}
                </p>
              </div>
            </div>

            {/* Producto y Cantidad en dos columnas */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Box className="w-5 h-5 text-slate-400 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Producto
                  </Label>
                  <p className="mt-1 text-base text-slate-900 font-medium truncate">
                    {name_prod}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-slate-900" />
                </div>
                <div className="flex-1">
                  <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Cantidad
                  </Label>
                  <p className="mt-1 text-base text-slate-900 font-medium">
                    {movedQuantity}
                  </p>
                </div>
              </div>
            </div>

            {/* Sucursal */}
            <div className="flex items-start gap-4">
              <Repeat className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Sucursal
                </Label>
                <p className="mt-1 text-base text-slate-900 font-medium">
                  {getBranchName(type, branch_from_name, branch_to_name)}
                </p>
              </div>
            </div>

            {/* Fecha */}
            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
              <div className="flex-1">
                <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Fecha y Hora
                </Label>
                <p className="mt-1 text-base text-slate-900 font-medium">
                  {formatDate(created_at)}
                </p>
              </div>
            </div>

            {/* Notas */}
            {description && (
              <div className="flex items-start gap-4 pt-2 border-t">
                <Clipboard className="w-5 h-5 text-slate-400 mt-0.5" />
                <div className="flex-1">
                  <Label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Notas
                  </Label>
                  <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer minimalista */}
        <DialogFooter className="px-8 py-4 border-t bg-slate-50">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="px-6 h-10 border-slate-300 hover:bg-slate-100 font-medium"
            >
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
