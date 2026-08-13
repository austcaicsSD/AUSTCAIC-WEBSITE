import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Footer from "./components/Footer";
import Socialdropdown from "./components/Socialdropdown"; // <-- Socialdropdown ইমপোর্ট করা হলো

export const metadata: Metadata = {
  title: "AUST Cybersecurity and AI Club",
  description: "Official website of AUSTCAIC",
};

// ================= PANEL SEMESTERS CONFIGURATION =================
const panelSemesters = [{ id: "fall-2025", label: "Fall 2025" }];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="bg-gray-50 font-sans text-gray-900 antialiased flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full group/nav">
          <nav className="w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] transition-all duration-300">
            <input type="checkbox" id="mobile-menu" className="hidden" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 sm:h-20">
                {/* BRAND LOGO */}
                <Link href="/" className="flex items-center gap-3 group z-50">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-[0.8rem] bg-white border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-blue-500/30 transition-all duration-500 group-hover:scale-105">
                    <Image
                      src="/AUSTCAIC-logo.jpg"
                      alt="AUSTCAIC Logo"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg sm:text-2xl font-black tracking-tight text-gray-950 leading-none">
                      AUST
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        CAIC
                      </span>
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-0.5 group-hover:text-blue-600 transition-colors">
                      Cyber & AI
                    </span>
                  </div>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <div className="hidden md:flex items-center gap-6">
                  <div className="flex items-center gap-1 font-bold text-sm text-gray-600 bg-gray-100/60 p-1.5 rounded-2xl border border-gray-200/50">
                    <Link
                      href="/"
                      className="px-4 py-2 rounded-xl hover:text-gray-950 hover:bg-white hover:shadow-sm transition-all duration-300"
                    >
                      Home
                    </Link>

                    {/* EXECUTIVE COMMITTEE DROPDOWN */}
                    <div className="relative group/dropdown">
                      <button className="px-4 py-2 rounded-xl hover:text-gray-950 hover:bg-white hover:shadow-sm transition-all duration-300 flex items-center gap-1 cursor-pointer">
                        Executive Committee
                        <svg
                          className="w-4 h-4 transition-transform group-hover/dropdown:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-xl shadow-lg opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 flex flex-col p-2 z-50">
                        {panelSemesters.map((semester) => (
                          <Link
                            key={semester.id}
                            href={`/panel/${semester.id}`}
                            className="px-4 py-2.5 text-sm font-bold text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            {semester.label}
                          </Link>
                        ))}
                      </div>
                    </div>

                    <Link
                      href="/culture/syllabus"
                      className="px-4 py-2 rounded-xl hover:text-gray-950 hover:bg-white hover:shadow-sm transition-all duration-300"
                    >
                      Culture
                    </Link>
                    <Link
                      href="/lab-free"
                      className="px-4 py-2 rounded-xl hover:text-gray-950 hover:bg-white hover:shadow-sm transition-all duration-300 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>{" "}
                      Resources
                    </Link>
                    <Link
                      href="/login"
                      className="px-4 py-2 rounded-xl hover:text-gray-950 hover:bg-white hover:shadow-sm transition-all duration-300"
                    >
                      Login
                    </Link>
                  </div>

                  {/* JOIN COMMUNITY SOCIAL DROPDOWN RESTORED */}
                  <Socialdropdown />
                </div>

                {/* MOBILE HAMBURGER BUTTON */}
                <label
                  htmlFor="mobile-menu"
                  className="md:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
                >
                  <span className="w-5 h-0.5 bg-gray-800 rounded-full mb-1.5 transition-all duration-300 origin-center group-has-[:checked]/nav:translate-y-[8px] group-has-[:checked]/nav:rotate-45"></span>
                  <span className="w-5 h-0.5 bg-gray-800 rounded-full mb-1.5 transition-all duration-300 group-has-[:checked]/nav:opacity-0"></span>
                  <span className="w-5 h-0.5 bg-gray-800 rounded-full transition-all duration-300 origin-center group-has-[:checked]/nav:-translate-y-[8px] group-has-[:checked]/nav:-rotate-45"></span>
                </label>
              </div>
            </div>

            {/* MOBILE NAVIGATION DROPDOWN */}
            <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-gray-200/60 overflow-hidden max-h-0 group-has-[:checked]/nav:max-h-[600px] transition-all duration-500 ease-in-out shadow-2xl">
              <div className="flex flex-col px-5 py-6 gap-2">
                <Link
                  href="/"
                  className="font-bold text-gray-600 hover:text-gray-950 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all flex items-center justify-between"
                >
                  Home{" "}
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>

                <div className="flex flex-col gap-1 border-y border-gray-100 py-2 my-1">
                  <span className="px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Executive Committee
                  </span>
                  {panelSemesters.map((semester) => (
                    <Link
                      key={semester.id}
                      href={`/panel/${semester.id}`}
                      className="font-bold text-gray-600 hover:text-blue-600 pl-6 pr-3 py-2 rounded-xl hover:bg-blue-50 transition-all"
                    >
                      {semester.label}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/culture/syllabus"
                  className="font-bold text-gray-600 hover:text-gray-950 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all flex items-center justify-between"
                >
                  Culture{" "}
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href="/lab-free"
                  className="font-bold text-gray-600 hover:text-gray-950 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>{" "}
                    Resources
                  </span>{" "}
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>
                <Link
                  href="/login"
                  className="font-bold text-gray-600 hover:text-gray-950 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all flex items-center justify-between"
                >
                  Login{" "}
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </Link>

                <div className="mt-4 flex justify-center items-center">
                  <Socialdropdown />
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow z-10">{children}</main>

        {/* ================= FOOTER RESTORED ================= */}
        <Footer />
      </body>
    </html>
  );
}
