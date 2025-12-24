import { supabase } from "@/api/supabaseClient";

//service para actualizar el avatar del usuario
export interface UploadProfileImageParams {
  file: File;
  userId: string;
}

//Sube una imagen de perfil al bucket "avatars" y retorna la URL pública
export const uploadProfileImage = async ({
  file,
  userId,
}: UploadProfileImageParams) => {
  if (!file) {
    throw new Error("No se proporcionó ninguna imagen");
  }

  // OPCIÓN RECOMENDADA: Forzamos un nombre único sin depender de la extensión del input
  // Al usar 'upsert: true', Supabase reemplazará el archivo si el nombre es idéntico
  const filePath = `profiles/${userId}`; // Sin extensión o puedes usar .webp para optimizar

  // Subir la imagen
  const { error: uploadError } = await supabase.storage
    .from("img-products")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
      contentType: file.type, // Importante: enviamos el tipo MIME real del archivo
    });

  if (uploadError) {
    throw new Error("Error al subir la imagen de perfil");
  }

  // Obtener URL pública (añadimos un timestamp para evitar el caché del navegador)
  const { data } = supabase.storage.from("img-products").getPublicUrl(filePath);
  const publicUrlWithTimestamp = `${data.publicUrl}?t=${new Date().getTime()}`;

  // Actualizar la tabla de usuarios
  const { data: avatar, error } = await supabase
    .from("users")
    .update({ avatar: publicUrlWithTimestamp })
    .eq("id", userId)
    .select();

  if (error) {
    throw new Error("Error al actualizar el avatar del usuario");
  }

  return avatar;
};
