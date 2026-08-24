import ClientBackground from "../profile/ClientBackground";
import { Skeleton } from "@/app/components/Skeleton";

export default function Loading() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#fafafa] text-gray-900 font-sans flex flex-col">
      <ClientBackground />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <div className="w-full max-w-lg">
          <div className="bg-white/70 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] border border-white/50 shadow-2xl">
            <div className="text-center mb-8">
              <Skeleton className="mx-auto w-16 h-16 rounded-2xl mb-6" />
              <Skeleton className="h-8 w-2/3 mx-auto mb-4" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </div>

            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="w-full h-14 rounded-xl" />
                </div>
              ))}

              <Skeleton className="w-full h-14 rounded-xl mt-8" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
