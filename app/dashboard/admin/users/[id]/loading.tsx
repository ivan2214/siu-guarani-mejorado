import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function UserDetailLoading() {
  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Skeleton className="mb-4 h-32 w-32 rounded-full" />
              <Skeleton className="mb-2 h-8 w-[150px]" />
              <Skeleton className="mb-2 h-4 w-[100px]" />
              <Skeleton className="mb-4 h-6 w-[80px]" />
              <div className="w-full space-y-3">
                {Array(4)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
              </div>
              <Separator className="my-4" />
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
                <Skeleton className="h-4 w-[250px]" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {Array(8)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i} className="space-y-1">
                        <Skeleton className="h-4 w-[100px]" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <Skeleton className="h-4 w-[100px]" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-6 w-full" />
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
