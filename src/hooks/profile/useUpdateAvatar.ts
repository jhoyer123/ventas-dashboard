import { useQueryClient, useMutation } from "@tanstack/react-query";
import { uploadProfileImage } from "@/services/profileService";
//type del service
import type { UploadProfileImageParams } from "@/services/profileService";

//hook para actualizar el avatar del usuario
export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UploadProfileImageParams) => uploadProfileImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
