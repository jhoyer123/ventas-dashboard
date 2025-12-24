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
  setOpenAlert: () => void;
  funDelete: () => void;
  nameDelete?: string;
}

export function AlertDelete({
  title,
  description,
  isOpen,
  setOpenAlert,
  funDelete,
  nameDelete,
}: AlertDeleteProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setOpenAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-title">
            {title} : <span className="ml-1.5 text-chart-3">{nameDelete}</span>
          </AlertDialogTitle>
          <AlertDialogDescription className="font-body">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex w-full justify-between">
            <AlertDialogCancel className="cursor-pointer bg-chart-4">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer bg-destructive"
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
