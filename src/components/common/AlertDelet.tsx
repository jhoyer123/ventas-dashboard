import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertDeleteProps {
  title: string;
  description: string;
  isOpen: boolean;
  setOpenAlert: (open: boolean) => void;
  funDelete: () => void;
}

export function AlertDelete({
  title,
  description,
  isOpen,
  setOpenAlert,
  funDelete,
}: AlertDeleteProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpenAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex w-full justify-between">
            <AlertDialogCancel className="cursor-pointer bg-gray-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-red-500 hover:bg-red-600"
              onClick={funDelete}
            >
              Eliminar
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
