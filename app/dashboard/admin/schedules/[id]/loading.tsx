import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function ScheduleDetailLoading() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="text-center">
                <Skeleton className="mx-auto mb-2 h-8 w-[100px]" />
                <Skeleton className="mx-auto mb-2 h-6 w-[200px]" />
                <Skeleton className="mx-auto mb-4 h-6 w-[80px]" />
              </div>

              <Separator />

              <div className="space-y-3">
                <Skeleton className="h-5 w-[150px]" />
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
              </div>

              <Separator />

              <div className="space-y-3">
                <Skeleton className="h-5 w-[150px]" />
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
              </div>

              <Separator />

              <div className="space-y-3">
                <Skeleton className="h-5 w-[100px]" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>

              <Separator />

              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-2">
          <div className="space-y-4">
            <div className="mb-4 flex gap-2">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full" />
                ))}
            </div>

            <Card>
              <CardHeader>
                <Skeleton className="mb-2 h-6 w-[150px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array(2)
                .fill(null)
                .map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-6 w-[150px]" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Array(3)
                          .fill(null)
                          .map((_, j) => (
                            <div key={j} className="flex justify-between">
                              <Skeleton className="h-4 w-[100px]" />
                              <Skeleton className="h-4 w-[100px]" />
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-[180px]" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {Array(3)
                    .fill(null)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
