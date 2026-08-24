"use client";
import Link from "next/link";
import Socialdropdown from "./Socialdropdown";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type PanelSemester = { id: string; label: string };

export default function Navigation({
  panelSemesters,
}: {
  panelSemesters: PanelSemester[];
}) {
  const [open, setOpen] = useState(false);
  // ===== MOBILE "EXECUTIVE COMMITTEE" ACCORDION (closed by default) =====
  const [panelOpen, setPanelOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const deskLink = (active: boolean) =>
    `px-4 py-2 rounded-xl transition-all duration-300 ${
      active
        ? "bg-white text-gray-950 shadow-sm"
        : "hover:text-gray-950 hover:bg-white hover:shadow-sm"
    }`;

  const mobileLink = (active: boolean) =>
    `font-bold p-3 rounded-xl border transition-all flex items-center justify-between ${
      active
        ? "bg-blue-50 border-blue-100 text-blue-700"
        : "text-gray-600 hover:text-gray-950 hover:bg-gray-50 border-transparent hover:border-gray-100"
    }`;

  // ===== CLOSE MOBILE MENU ON OUTSIDE CLICK / ESC =====
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target)) return; // click inside the dropdown
      if (buttonRef.current?.contains(target)) return; // let the button toggle itself
      setOpen(false);
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  // reset the accordion whenever the mobile menu closes
  const closeMenu = () => {
    setOpen(false);
    setPanelOpen(false);
  };

  return (
    <nav className="relative w-full bg-white/70 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/60 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.28)] transition-all duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* BRAND LOGO */}
          <Link href="/" onClick={closeMenu} className="flex items-center gap-3 group z-50">
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
                Cyber &amp; AI
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 font-bold text-sm text-gray-600 bg-white/40 p-1.5 rounded-2xl border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              <Link href="/" className={deskLink(isActive("/"))}>
                Home
              </Link>

              {/* EXECUTIVE COMMITTEE DROPDOWN */}
              <div className="relative group/dropdown">
                <button
                  className={`${deskLink(
                    isActive("/panel")
                  )} flex items-center gap-1 cursor-pointer`}
                >
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
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/85 backdrop-blur-2xl backdrop-saturate-150 border border-white/70 rounded-2xl shadow-[0_24px_60px_-15px_rgba(15,23,42,0.35)] opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-300 flex flex-col p-2 z-50">
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
                className={deskLink(isActive("/culture"))}
              >
                Culture
              </Link>
              <Link
                href="/lab-free"
                className={`${deskLink(
                  isActive("/lab-free")
                )} flex items-center gap-1.5`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>{" "}
                Resources
              </Link>
              <Link href="/login" className={deskLink(isActive("/login"))}>
                Login
              </Link>
            </div>

            {/* JOIN COMMUNITY SOCIAL DROPDOWN */}
            <Socialdropdown />
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            ref={buttonRef}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10 bg-gray-100 rounded-xl cursor-pointer hover:bg-gray-200 transition-colors"
          >
            <span
              className={`w-5 h-0.5 bg-gray-800 rounded-full mb-1.5 transition-all duration-300 origin-center ${
                open ? "translate-y-[8px] rotate-45" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-gray-800 rounded-full mb-1.5 transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-5 h-0.5 bg-gray-800 rounded-full transition-all duration-300 origin-center ${
                open ? "-translate-y-[8px] -rotate-45" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION DROPDOWN */}
      <div
        id="mobile-nav"
        ref={menuRef}
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/60 overflow-hidden transition-all duration-500 ease-in-out shadow-[0_24px_60px_-15px_rgba(15,23,42,0.35)] z-40 ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-5 py-6 gap-2">
          <Link
            href="/"
            onClick={closeMenu}
            className={mobileLink(isActive("/"))}
          >
            Home{" "}
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>

          {/* EXECUTIVE COMMITTEE — COLLAPSIBLE, CLOSED BY DEFAULT */}
          <button
            type="button"
            aria-expanded={panelOpen}
            aria-controls="mobile-panel-semesters"
            onClick={() => setPanelOpen((v) => !v)}
            className={`w-full text-left cursor-pointer ${mobileLink(
              isActive("/panel")
            )}`}
          >
            Executive Committee{" "}
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                panelOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          <div
            id="mobile-panel-semesters"
            className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out ${
              panelOpen ? "max-h-96 mt-1" : "max-h-0"
            }`}
          >
            {panelSemesters.map((semester) => (
              <Link
                key={semester.id}
                href={`/panel/${semester.id}`}
                onClick={closeMenu}
                className="font-bold text-gray-600 hover:text-blue-600 pl-6 pr-3 py-2 rounded-xl hover:bg-blue-50 transition-all"
              >
                {semester.label}
              </Link>
            ))}
          </div>

          <Link
            href="/culture/syllabus"
            onClick={closeMenu}
            className={mobileLink(isActive("/culture"))}
          >
            Culture{" "}
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
          <Link
            href="/lab-free"
            onClick={closeMenu}
            className={mobileLink(isActive("/lab-free"))}
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span> Resources
            </span>{" "}
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
          <Link
            href="/login"
            onClick={closeMenu}
            className={mobileLink(isActive("/login"))}
          >
            Login{" "}
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>

          <div className="mt-4 flex justify-center items-center">
            <Socialdropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}