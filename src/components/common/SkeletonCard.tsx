import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 p-4 max-w-7xl w-full h-full bg-background-view">
      <div className="flex flex-col gap-3 md:flex-row mx-auto">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-card" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-card" />
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-card" />
      </div>
      <div className="space-y-2 mx-auto">
        <Skeleton className="h-4 w-[250px] bg-card" />
        <Skeleton className="h-4 w-[200px] bg-card" />
      </div>
    </div>
  );
}
