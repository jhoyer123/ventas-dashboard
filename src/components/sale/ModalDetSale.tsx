import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Receipt, CheckCircle2, Loader2 } from "lucide-react"; // Agregué Loader2
import type { SaleH } from "@/types/saleh";
import { Content } from "../sale/compModalDeb/Content";
import { useGetProdSale } from "@/hooks/pdfSale/useGetProdSale";

// 1. IMPORTACIONES DEL PDF
import { pdf } from "@react-pdf/renderer";
import { FormatReceipt } from "../receipts/FormatReceipt";

interface SaleDetailsModalProps {
  sale: SaleH;
  open?: boolean;
  closeModal?: () => void;
}

export const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; color: string }> = {
    COMPLETED: { label: "COMPLETADO", color: "bg-green-100 text-green-800" },
    PENDING: { label: "PENDIENTE", color: "bg-yellow-100 text-yellow-800" },
    CANCELED: { label: "CANCELADO", color: "bg-red-100 text-red-800" },
  };

  const config = statusConfig[status] || {
    label: status,
    color: "bg-gray-100 text-gray-800",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
    >
      <CheckCircle2 className="w-4 h-4" />
      {config.label}
    </span>
  );
};

export const getPaymentMethod = (method: string) => {
  const methods: Record<string, string> = {
    CASH: "Efectivo",
    CARD: "Tarjeta",
    TRANSFER: "Transferencia",
    QR: "Código QR",
  };
  return methods[method] || method;
};

export const ModalDetSale = ({
  open,
  sale,
  closeModal,
}: SaleDetailsModalProps) => {
  // Hook de productos
  const { data: productsSale, isLoading } = useGetProdSale(sale.id);
  // Estado local para mostrar carga mientras se genera el PDF
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    if (!productsSale) return;

    setIsGenerating(true);

    try {
      // A. Generar el PDF como Blob
      const blob = await pdf(
        <FormatReceipt data={{ ...sale, items: productsSale }} />,
      ).toBlob();

      // C. Crear URL y abrir en nueva pestaña
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error generando recibo:", error);
      alert("Hubo un error al generar el PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Detalles de Venta
          </DialogTitle>
          <DialogDescription>
            Información completa de la transacción #{sale.receiptNumber}
          </DialogDescription>
        </DialogHeader>

        <Content sale={sale} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cerrar
            </Button>
          </DialogClose>

          <Button
            onClick={handleGeneratePDF}
            // Deshabilitamos si está cargando productos O generando el PDF
            disabled={isLoading || isGenerating || !productsSale}
            className="bg-brand text-brand-foreground hover:bg-brand-hover-dark cursor-pointer"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Receipt className="w-4 h-4 mr-2" />
                Generar Recibo
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
