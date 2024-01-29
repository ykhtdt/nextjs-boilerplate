import { Skeleton } from "@/components/ui/skeleton";

export default async function Page({ params }: { params: { subCategory: string } }) {
  const res = await fetch(`${process.env.API_URL}/items`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Something went wrong. Please try again.");
  }

  const { length } = await res.json();

  const repeat = Array.from({ length });

  return (
    <>
      <h3 className="mt-4 mb-2 text-lg font-bold capitalize">{params.subCategory}</h3>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {repeat.map((_, i) => (
          <div className="p-4 border rounded-lg" key={i}>
            <div className="space-y-4">
              <Skeleton className="h-24" />
              <div className="flex gap-4">
                <div className="basis-1/4">
                  <Skeleton className="h-10" />
                </div>
                <div className="flex flex-col gap-2 basis-3/4">
                  <Skeleton className="h-4 basis-full" />
                  <Skeleton className="h-4 basis-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
