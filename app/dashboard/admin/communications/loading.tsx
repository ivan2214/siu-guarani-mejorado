import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CommunicationsLoading() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[180px]" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <Skeleton className="h-6 w-[150px]" />
            <div className="flex flex-col gap-2 md:flex-row">
              <Skeleton className="h-10 w-full md:w-[250px]" />
              <Skeleton className="h-10 w-full md:w-[180px]" />
              <Skeleton className="h-10 w-full md:w-[180px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="mb-4 flex gap-2 overflow-x-auto">
              <Skeleton className="h-10 w-[150px] flex-shrink-0" />
              <Skeleton className="h-10 w-[120px] flex-shrink-0" />
              <Skeleton className="h-10 w-[120px] flex-shrink-0" />
              <Skeleton className="h-10 w-[100px] flex-shrink-0" />
            </div>
            <div className="space-y-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
