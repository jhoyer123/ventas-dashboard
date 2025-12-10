import { useState } from "react";
import { MapPin, Users, Building2, Plus, Calendar } from "lucide-react";
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

// --- Variables de color
const CARD_BG = "bg-gray-900/90"; // Fondo de tarjetas
const TEXT_LIGHT = "text-gray-200"; // Texto principal
const TEXT_MUTED = "text-gray-200"; // Texto secundario/descripciones
const BORDER_COLOR = "border-gray-600"; // Bordes sutiles
const PRIMARY_COLOR = "bg-indigo-500 hover:bg-indigo-600 text-white"; // Botones y acentos primarios (el violeta/azul de la imagen)
const PRIMARY_TEXT = "text-indigo-500";

const Branch = () => {
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

  //hook de obtención de sucursales
  const { data: branches } = useGetBranches();

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
    } catch (error) {
      console.error("Error capturado después de la mutación:", error);
    }
  };

  return (
    <div className={`p-6 sm:p-8 font-sans text-black`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section: Título y Acción Principal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight`}>
              Gestión de Sucursales
            </h1>
            <p className={`mt-1 text-sm sm:text-base`}>
              Administra las ubicaciones operativas de tu negocio.
            </p>
          </div>
          {/* Botón de Nueva Sucursal */}
          <Button
            onClick={() => {
              setBranchS(undefined);
              handleOpenModal();
            }}
            className={`p-4 text-md cursor-pointer ${PRIMARY_COLOR}`}
          >
            <Plus
              size={18}
              className="group-hover:rotate-90 transition-transform"
            />
            <span>Nueva Sucursal</span>
          </Button>
        </div>

        {/* Grid de Sucursales: Diseño "Card Enterprise" */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches?.map((sucursal) => (
            <div
              key={sucursal.id}
              className={`group ${CARD_BG} rounded-xl border ${BORDER_COLOR} shadow-xl hover:shadow-2xl hover:border-indigo-500 transition-all duration-300 flex flex-col`}
            >
              {/* Card Header */}
              <div
                className={`p-5 border-b ${BORDER_COLOR} flex justify-between items-start`}
              >
                <div className="flex gap-3 items-center justify-center">
                  <div
                    className={`p-2.5 rounded-lg h-fit bg-indigo-900/50 text-indigo-400`}
                  >
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${TEXT_LIGHT} leading-tight group-hover:${PRIMARY_TEXT} transition-colors mx-auto`}
                    >
                      {sucursal.branchName}
                    </h3>
                  </div>
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

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1">
                <div className={`flex items-start gap-3 text-sm ${TEXT_MUTED}`}>
                  <MapPin
                    size={16}
                    className="mt-0.5 text-indigo-400 shrink-0"
                  />
                  <span className="line-clamp-2">{sucursal.address}</span>
                </div>

                {/* Datos derivados (Employees, CreatedAt) */}
                <div className="flex items-center justify-between pt-2">
                  <div
                    className={`flex items-center gap-2 text-sm ${TEXT_LIGHT} bg-gray-700/50 px-3 py-1.5 rounded-md border ${BORDER_COLOR}`}
                  >
                    <Users size={14} className={PRIMARY_TEXT} />
                    <span>{sucursal.empleados || 0} Empleados</span>
                  </div>
                  <div
                    className={`flex items-center gap-2 text-xs ${TEXT_MUTED}`}
                  >
                    <Calendar size={14} />
                    <span>
                      {new Date(sucursal.createdAt).toLocaleDateString()}
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
        title="Eliminar Sucursal"
        description="¿Estás seguro de que deseas eliminar esta sucursal? Esta acción no se puede deshacer."
        isOpen={isOpenDelete}
        setOpenAlert={handleOpenAlertDelete}
        funDelete={() => {
          if (branchS) {
            handleDeleteBranch(branchS.id);
          }
        }}
      />
    </div>
  );
};

export default Branch;
