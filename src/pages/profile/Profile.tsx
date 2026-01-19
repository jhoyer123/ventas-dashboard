import { useState } from "react";
import { Camera, Mail, User, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormChangePass } from "@/components/profile/FormChangePass";
//importamos el context de auth
import { useAuth } from "@/context/AuthContext";
//hook para el cambio de password
import { useChangePassword } from "@/hooks/auth/useChangePassword";
//hook para el cambio de avatar
import { useUpdateAvatar } from "@/hooks/profile/useUpdateAvatar";
import { toast } from "sonner";
import type { PasswordChange } from "@/schemes/profile";

const Profile = () => {
  //usames el context de auth
  const { user } = useAuth();
  //estados para el avatar
  const [preview, setPreview] = useState(user?.avatar);
  const [file, setFile] = useState<File | null>(null);
  //logica del cambio de avatar
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];
    if (!img) return;
    if (!allowedTypes.includes(img.type)) {
      toast.error("Formato no permitido", {
        position: "top-center",
        duration: 4000,
      });
      return;
    }
    const MAX_SIZE = 2 * 1024 * 1024;
    if (img.size > MAX_SIZE) {
      toast.error("La imagen es muy pesada", {
        position: "top-center",
        duration: 4000,
      });
      return;
    }
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };
  //usamos el hook para actualizar el avatar
  const updateAvatarMutation = useUpdateAvatar();
  //funcion para manejar el submit del avatar
  const handleAvatarSubmit = () => {
    if (!file || !user) return;
    const promise = updateAvatarMutation.mutateAsync({ file, userId: user.id });
    toast.promise(promise, {
      loading: "Actualizando avatar...",
      success: "Avatar actualizado con éxito",
      error: (err) => err.message || "Error al actualizar el avatar",
      position: "top-center",
      duration: 4000,
    });
  };

  //logica del camvio de password
  const changePasswordMutation = useChangePassword();
  const handleCP = (data: PasswordChange) => {
    const promise = changePasswordMutation.mutateAsync({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      email: user?.email!,
    });
    toast.promise(promise, {
      loading: "Cambiando contraseña...",
      success: "Contraseña cambiada con éxito",
      error: (err) => err.message || "Error al cambiar la contraseña",
      position: "top-center",
      duration: 4000,
    });
  };

  return (
    // min-h-screen asegura que el fondo cubra todo aunque el contenido sea poco
    <div className="bg-background-view p-4 md:px-8 md:py-2 flex flex-col items-center h-full overflow-y-auto">
      {/* CONTENEDOR PRINCIPAL: Max-width para que no se estire infinito en monitores 4K */}
      <div className="w-full max-w-4xl bg-card rounded-xl shadow-sm border border-border ">
        {/* GRID RESPONSIVE: 1 columna en móvil, 2 columnas en escritorio (lg) */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ================= SECCIÓN AVATAR (Izquierda/Arriba) ================= */}
          <div className="p-8 md:p-12 flex flex-col items-center justify-center bg-ring/10 lg:border-b-0 lg:border-r border-border">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-card-foreground">
                Perfil de usuario
              </h2>
            </div>
            <div className="relative group">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-ring shadow-2xl">
                <img
                  src={
                    !preview
                      ? "https://i.pinimg.com/736x/56/fa/35/56fa35ecb5b0417a563b2dbe0fdbef7b.jpg"
                      : preview
                  }
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
              </div>
              <label className="absolute bottom-2 right-2 bg-primary p-3 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg border-2 border-card">
                <Camera className="w-5 h-5 text-primary-foreground" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={onAvatarChange}
                />
              </label>
            </div>

            {file && (
              <Button
                onClick={handleAvatarSubmit}
                size="sm"
                className="mt-4 w-full max-w-[150px] bg-primary rounded-full cursor-pointer"
              >
                Guardar foto
              </Button>
            )}
          </div>

          {/* ================= SECCIÓN FORMULARIO (Derecha/Abajo) ================= */}
          <div className="p-8 md:p-12 my-auto">
            <div className="space-y-7">
              {/* Input Nombre */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User size={16} />
                  <Label className="font-bold text-card-foreground">
                    Nombre
                  </Label>
                </div>
                <span className="border-none focus-visible:ring-0 text-card-foreground">
                  {user?.name}
                </span>
              </div>

              {/* Input Email */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail size={16} />
                  <Label className="font-bold text-card-foreground">
                    Email
                  </Label>
                </div>
                <span className="border-none focus-visible:ring-0 text-card-foreground">
                  {user?.email}
                </span>
              </div>

              {/* Input Teléfono */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={16} />
                  <Label className="font-bold text-card-foreground">
                    Teléfono
                  </Label>
                </div>
                <span className="border-none focus-visible:ring-0 text-card-foreground">
                  {!user?.phone ? "sin teléfono" : user?.phone}
                </span>
              </div>

              {/* Input Rol */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield size={16} />
                  <Label className="font-bold text-card-foreground">
                    Rol del usuario
                  </Label>
                </div>
                <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold font-body uppercase tracking-wider">
                  {user?.role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Componente de cambio de password debajo */}
      <div className="w-full max-w-4xl">
        <FormChangePass funParent={handleCP} />
      </div>
    </div>
  );
};

export default Profile;
