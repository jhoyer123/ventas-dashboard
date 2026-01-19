import { Skeleton } from "@/components/ui/skeleton";

export const title = "Form with Labels";

export const SkeletonCreateProduct = () => (
  <div className="flex w-full max-w-7xl flex-col gap-6 p-6 mx-auto">
    <div className="flex flex-col gap-2">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-3 w-48" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-24 w-full" />
    </div>
    <Skeleton className="h-10 w-full" />
  </div>
);
