import ClientBackground from "./ClientBackground";

export default function Loading() {
  return (
    <main className="relative min-h-screen w-full bg-[#fafafa] text-gray-900 font-sans flex flex-col p-6 sm:p-12 overflow-hidden">
      <ClientBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full animate-pulse">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black tracking-tight text-gray-950">
            AUST<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">CAIC</span> Profile
          </h1>
          <div className="w-24 h-10 bg-gray-200 rounded-xl"></div>
        </header>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40">
          <div className="h-8 bg-gray-200 rounded-lg w-1/2 mb-6 sm:w-1/3"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
