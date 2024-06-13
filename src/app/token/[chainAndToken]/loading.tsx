import { Skeleton } from "@/app/components/Skeleton";

export default function Loading() {
  return (
    <div className="flex px-3 max-w-screen-sm self-center w-full flex-col items-center justify-start grow gap-5   pt-10">
      <Skeleton className="w-full h-32" />
      <Skeleton className="w-full h-52" />
      <Skeleton className="w-full h-72" />
    </div>
  );
}
