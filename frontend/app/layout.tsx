import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

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
        {/* ================= FULL-WIDTH PREMIUM NAVBAR ================= */}
        <header className="sticky top-0 z-50 w-full pointer-events-none">
          {/* Nav background spans 100% width */}
          <nav className="pointer-events-auto w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] transition-all duration-300">
            {/* Inner container keeps content aligned and centered */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 sm:h-20">
                {/* Logo Section with Magnetic Hover Feel */}
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brandBlue to-brandPurple flex items-center justify-center text-white font-black text-xl shadow-[0_4px_12px_rgba(29,78,216,0.2)] group-hover:shadow-brandBlue/40 transition-all duration-500 group-hover:rotate-[6deg] group-hover:scale-105">
                    {/* Minimalist Tech Dot inside Logo */}
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white animate-ping opacity-40"></span>
                    A
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-black tracking-tight text-gray-950 leading-none">
                      AUST
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
                        CAIC
                      </span>
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mt-0.5 group-hover:text-brandBlue transition-colors">
                      Cyber & AI
                    </span>
                  </div>
                </Link>

                {/* Navigation Links with Floating Capsule Hover Effect */}
                <div className="flex items-center gap-2 sm:gap-6">
                  <div className="hidden sm:flex items-center gap-1 font-bold text-sm text-gray-600 bg-gray-100/50 p-1.5 rounded-xl border border-gray-200/30">
                    <Link
                      href="/"
                      className="px-4 py-2 rounded-lg hover:text-gray-950 hover:bg-white transition-all duration-300"
                    >
                      Home
                    </Link>
                    <Link
                      href="/lab-free"
                      className="px-4 py-2 rounded-lg hover:text-gray-950 hover:bg-white transition-all duration-300 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brandPurple"></span>
                      Resources
                    </Link>
                  </div>

                  {/* Primary CTA Button with Smooth Outer Glow */}
                  <a
                    href="https://discord.com/invite/Y6V3wuq2j"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-gray-950 text-white text-xs sm:text-sm font-bold rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-brandBlue/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                  >
                    {/* Animated Hidden Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-brandBlue via-brandPurple to-brandBlue opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <span className="relative z-10 flex items-center gap-1.5 tracking-wide">
                      Join our discord community
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* Page Content */}
        <main className="min-h-screen z-10">{children}</main>
      </body>
    </html>
  );
}
