export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} aria-hidden="true" />;
}

export function SkeletonPanelCard() {
  return (
    <div className="w-full h-[420px] rounded-[2rem] overflow-hidden bg-white border border-gray-200 p-6 flex flex-col">
      <div className="flex items-start justify-between">
        <Skeleton className="w-10 h-10 rounded-xl" />
        <Skeleton className="w-24 h-7 rounded-xl" />
      </div>
      <div className="flex-grow flex items-end justify-center">
        <Skeleton className="w-32 h-48 rounded-2xl" />
      </div>
      <div className="space-y-2 pt-6">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}
