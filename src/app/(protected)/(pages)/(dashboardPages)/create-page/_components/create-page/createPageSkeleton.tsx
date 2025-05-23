import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CreatePageSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-10 w-3/4" />
        <Skeleton className="mx-auto h-4 w-1/2" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <Card key={index}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-8">
        <Skeleton className="h-8 w-1/4" />
        <div className="space-y-2">
          {[0, 1, 2].map((index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="mb-1 h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePageSkeleton;
