import { Skeleton, SkeletonPanelCard } from "@/app/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#fcfcfc] font-sans">
      <div className="relative z-10 pt-16 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center">
        <Skeleton className="h-9 w-56 rounded-full" />
        <Skeleton className="mt-6 h-14 w-full max-w-lg rounded-2xl" />
        <Skeleton className="mt-4 h-5 w-full max-w-xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-28">
        <Skeleton className="mx-auto mb-14 h-14 w-full max-w-xl rounded-2xl" />

        <div className="flex items-center gap-4 border-b-2 border-gray-200/60 pb-4 mb-10">
          <div className="w-2 h-10 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
          <Skeleton className="h-9 w-64" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonPanelCard key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
