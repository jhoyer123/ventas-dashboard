import { useState } from "react";
import { MapPin, Users, Building2, Plus, Calendar, Box } from "lucide-react";
// Importamos el modal (asegúrate que la ruta sea correcta)
import { ModalAddBranch } from "@/components/branch/ModalAddBranch";
// Importamos el hook y tipos (asegúrate que la ruta sea correcta)
import { useCreateBranch } from "@/hooks/branch/useCreateBranch";
//import el hook de obtención de sucursales
import { useGetBranches } from "@/hooks/branch/useGetBranches";
import type { BranchInput, BranchOutput } from "@/types/branch";
import { Button } from "@/components/ui/button";
import { DropDownAction } from "@/components/common/DropDownAction";
import { useUpdateBranch } from "@/hooks/branch/useUpdateBranch";
import { toast } from "sonner";
import { useDeleteBranch } from "@/hooks/branch/useDeleteBranch";
import { AlertDelete } from "@/components/common/AlertDelet";
//context de la surcursal
import { useBranch } from "@/context/BranchContext";

// --- Variables de color
const BORDER_COLOR = "border-gray-600"; // Bordes sutiles
const PRIMARY_COLOR = "bg-indigo-500 hover:bg-indigo-600 text-white"; // Botones y acentos primarios (el violeta/azul de la imagen)

const Branch = () => {
  //context sucursal
  const { setBranchId, currentBranch } = useBranch();
  //hook de obtención de sucursales
  const { data: branches } = useGetBranches();
  //logica para delete y update
  const [branchS, setBranchS] = useState<BranchOutput | undefined>(undefined);
  // Lógica del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Función para abrir/cerrar el modal y resetear los valores
  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Hook de creación y actualización de sucursales
  const create = useCreateBranch();
  const update = useUpdateBranch();
  // Función onSubmit que maneja tanto creación como actualización con disparo del sonner toast
  const onSubmit = async (data: BranchInput) => {
    //Determinar qué promesa ejecutar
    const promise = !branchS
      ? create.mutateAsync(data) // Retorna la promesa de creación
      : update.mutateAsync({ id: branchS.id, dataBranch: data }); // Retorna la promesa de actualizacións
    try {
      //Envolver la promesa con toast.promise
      await toast.promise(promise, {
        loading: "Guardando datos...",
        success: () => {
          return `${
            !branchS ? "Sucursal Creada" : "Sucursal Actualizada"
          } con éxito.`;
        },
        error: (err) => {
          return `Fallo: ${err.message || "Error desconocido"}`;
        },
        position: "top-right",
        duration: 4000,
      });
      setIsModalOpen(false);
    } catch (error) {
      //Si la promesa falla, el catch se ejecuta.
      console.error("Error capturado después de la mutación:", error);
    }
  };

  //estado de la alerta de eliminación
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const handleOpenAlertDelete = () => {
    setIsOpenDelete(!isOpenDelete);
  };
  //hook de eliminación
  const deleteBranch = useDeleteBranch();
  //funcion de eliminación
  const handleDeleteBranch = async (idBranch: string) => {
    const promise = deleteBranch.mutateAsync(idBranch);
    try {
      await toast.promise(promise, {
        loading: "Eliminando sucursal...",
        success: "Sucursal eliminada con éxito.",
        error: (err) =>
          `Fallo al eliminar: ${err.message || "Error desconocido"}`,
        position: "top-right",
        duration: 4000,
      });
      //poner estado global de la sucrusal en nulo
      if (currentBranch === idBranch) {
        setBranchId(null);
      }
    } catch (error) {
      console.error("Error capturado después de la mutación:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 font-sans text-black">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Gestión de Sucursales
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Administra las ubicaciones operativas de tu negocio
            </p>
          </div>

          <Button
            onClick={() => {
              setBranchS(undefined);
              handleOpenModal();
            }}
            className={`flex items-center gap-2 ${PRIMARY_COLOR}`}
          >
            <Plus size={18} />
            <span>Nueva Sucursal</span>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {branches?.map((sucursal) => (
            <div
              key={sucursal.id}
              className={`rounded-lg border ${BORDER_COLOR} bg-white shadow-sm hover:shadow-md transition`}
            >
              {/* Card header */}
              <div
                className={`flex items-start justify-between gap-3 p-4 border-b ${BORDER_COLOR}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 rounded-md bg-indigo-100 text-indigo-600 shrink-0">
                    <Building2 size={18} />
                  </div>

                  <h3 className="font-medium text-gray-900 truncate">
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
                    },
                    {
                      label: "Eliminar",
                      action: () => {
                        setBranchS(sucursal);
                        handleOpenAlertDelete();
                      },
                    },
                  ]}
                />
              </div>

              {/* Card body */}
              <div className="p-4 space-y-3">
                {/* Address */}
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span className="line-clamp-2">{sucursal.address}</span>
                </div>

                {/* Footer info */}
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                  <div className="flex items-center gap-1.5">
                    <Users size={14} />
                    <span>{sucursal.total_employees || 0} empleados</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Box size={14} />
                    <span>{sucursal.total_products || 0} productos</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>
                      {new Date(sucursal.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal con el formulario para agregar o editar una sucursal */}
      <ModalAddBranch
        isOpen={isModalOpen}
        setOpen={handleOpenModal}
        onSubmit={onSubmit}
        initialValues={branchS} // Pasamos los valores iniciales para editar
      />

      {/* Alert de eliminación */}
      <AlertDelete
        title="Eliminar"
        description="¿Estás seguro de que deseas eliminar esta sucursal? Esta acción no se puede deshacer."
        isOpen={isOpenDelete}
        setOpenAlert={handleOpenAlertDelete}
        funDelete={() => {
          if (branchS) {
            handleDeleteBranch(branchS.id);
          }
        }}
        nameDelete={branchS?.branch_name}
      />
    </div>
  );
};

export default Branch;
