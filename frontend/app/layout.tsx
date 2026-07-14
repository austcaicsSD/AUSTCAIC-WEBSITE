import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "AUST Cybersecurity and AI Club",
  description: "Official website of AUSTCAIC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="bg-gray-50 font-sans text-gray-900 antialiased">
        
        {/* ================= FULL-WIDTH PREMIUM & RESPONSIVE NAVBAR ================= */}
        {/* group/nav and has-[:checked] are used for Zero-JS Mobile Menu Toggle */}
        <header className="sticky top-0 z-50 w-full group/nav">
          <nav className="w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] transition-all duration-300">
            
            {/* Hidden Checkbox for Mobile Menu State */}
            <input type="checkbox" id="mobile-menu" className="hidden" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 sm:h-20">
                
                {/* 1. BRAND LOGO SECTION */}
                <Link href="/" className="flex items-center gap-3 group z-50">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-[0.8rem] bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-blue-500/30 transition-all duration-500 group-hover:scale-105">
                    <Image 
                      src="/logo2.jpg" 
                      alt="AUSTCAIC Logo" 
                      fill 
                      sizes="48px" 
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg sm:text-2xl font-black tracking-tight text-gray-950 leading-none">
                      AUST<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">CAIC</span>
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-0.5 group-hover:text-blue-600 transition-colors">
                      Cyber & AI
                    </span>
                  </div>
                </Link>

                {/* 2. DESKTOP NAVIGATION (Hidden on Mobile) */}
                <div className="hidden md:flex items-center gap-6">
                  <div className="flex items-center gap-1 font-bold text-sm text-gray-600 bg-gray-100/60 p-1.5 rounded-2xl border border-gray-200/50">
                    <Link href="/" className="px-4 py-2 rounded-xl hover:text-gray-950 hover:bg-white hover:shadow-sm transition-all duration-300">
                      Home
                    </Link>
                    <Link href="/culture/syllabus" className="px-4 py-2 rounded-xl hover:text-gray-950 hover:bg-white hover:shadow-sm transition-all duration-300">
                      Culture
                    </Link>
                    <Link href="/lab-free" className="px-4 py-2 rounded-xl hover:text-gray-950 hover:bg-white hover:shadow-sm transition-all duration-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                      Resources
                    </Link>
                  </div>

                  {/* Primary CTA Button */}
                  <a
                    href="https://discord.com/invite/Y6V3wuq2j"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-950 text-white text-sm font-bold rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-blue-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="relative z-10 flex items-center gap-1.5 tracking-wide">
                      Join Discord Community
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                  </a>
                </div>

                {/* 3. MOBILE HAMBURGER BUTTON (Visible only on Mobile) */}
                <label htmlFor="mobile-menu" className="md:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors">
                  <span className="w-5 h-0.5 bg-gray-800 rounded-full mb-1.5 transition-all duration-300 origin-center group-has-[:checked]/nav:translate-y-[8px] group-has-[:checked]/nav:rotate-45"></span>
                  <span className="w-5 h-0.5 bg-gray-800 rounded-full mb-1.5 transition-all duration-300 group-has-[:checked]/nav:opacity-0"></span>
                  <span className="w-5 h-0.5 bg-gray-800 rounded-full transition-all duration-300 origin-center group-has-[:checked]/nav:-translate-y-[8px] group-has-[:checked]/nav:-rotate-45"></span>
                </label>
              </div>
            </div>

            {/* 4. MOBILE NAVIGATION DROPDOWN MENU */}
            <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-gray-200/60 overflow-hidden max-h-0 group-has-[:checked]/nav:max-h-[400px] transition-all duration-500 ease-in-out shadow-2xl">
              <div className="flex flex-col px-5 py-6 gap-3">
                <Link href="/" className="font-bold text-gray-600 hover:text-gray-950 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all flex items-center justify-between">
                  Home
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
                <Link href="/culture/syllabus" className="font-bold text-gray-600 hover:text-gray-950 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all flex items-center justify-between">
                  Culture
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
                <Link href="/lab-free" className="font-bold text-gray-600 hover:text-gray-950 p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all flex items-center justify-between">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span> Resources</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </Link>
                
                <a href="https://discord.com/invite/Y6V3wuq2j" target="_blank" rel="noopener noreferrer" className="mt-2 flex justify-center items-center gap-2 p-4 bg-gray-950 text-white font-bold rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.1)] active:scale-95 transition-transform">
                  Join our Discord
                </a>
              </div>
            </div>

          </nav>
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="min-h-screen z-10">{children}</main>
        
      </body>
    </html>
  );
}