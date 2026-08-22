"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactElement } from "react";

type SocialLink = {
  name: string;
  href: string;
  hoverColorClass: string;
  icon: ReactElement;
};

const links: SocialLink[] = [
  {
    name: "Discord",
    href: "https://discord.com/invite/pxaqZWh3A?fbclid=IwY2xjawTfvnFwZG9mBWV4dG4DYWVtAjEwAGJyaWQRMUx5REJ4UTZUNXpmYkRKd0dzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeHWi-AK0BxlaNGoQod8ujQs8qwxv0K12eNfpiLUPTRScfwnZBpkzoeFyIi7E_aem_seLWA_oMiA2lwBh1ucwivg",
    hoverColorClass: "group-hover/item:text-[#5865F2]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.09-.32 13.68.099 18.21a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.075.075 0 0 1 .079.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128c-.598.35-1.22.645-1.873.892a.076.076 0 0 0-.04.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.029 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.237-.838-9.786-3.549-13.815a.061.061 0 0 0-.031-.028ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.211 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419Z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2F%40austcybersecurityandaiclub-c2i%3Ffbclid%3DIwcGRvZgVleHRuA2FlbQIxMABicmlkETFMeURCeFE2VDV6ZmJESndHc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHn7VfolK64pYgTK-QIbpN9ZCtMjbEx8LAOgcSjtV4ZOU1JKRHUI83qo17sHs_aem_qzybUPR7U86Er-pQavIj3w&h=AUC4gTsw8h2V6nyU-3Edw3G0Dr29NOBW-eLSifU0EWYB4fkAPw__ueHBPxDrIisPpCTUsBuObcocX40FsBDD1B3MK2AwkJhnc6Bv_a7MFhUcoRo6nPeAfErNajrp01w6s99D",
    hoverColorClass: "group-hover/item:text-[#FF0000]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Austcybersecurityandaiclub",
    hoverColorClass: "group-hover/item:text-[#1877F2]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.878h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94Z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/aust-cybersecurity-and-ai-club/posts/?feedView=all",
    hoverColorClass: "group-hover/item:text-[#0A66C2]",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z" />
      </svg>
    ),
  },
  {
  name: "Instagram",
  href: "https://www.instagram.com/aust_caic/?__d=1",
  hoverColorClass: "group-hover/item:text-[#E1306C]",
  icon: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947C23.73 2.7 21.308.273 16.949.073 15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  ),
},
  
];

export default function SocialDropdown() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full md:w-auto">
      
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-950 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/30 active:translate-y-0 md:w-auto md:inline-flex"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
        <span className="relative z-10 flex items-center gap-1.5 tracking-wide">
          Join Our Community
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className={`h-4 w-4 transition-transform duration-300 ease-out ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/*
        Panel — in normal document flow and height-animated on mobile
      */}
      <div
        role="menu"
        className={`mt-2 w-full overflow-hidden rounded-xl border border-gray-200/60 bg-white/95 shadow-lg backdrop-blur-2xl transition-all duration-300 ease-out md:absolute md:right-0 md:z-50 md:w-auto md:origin-top-right md:overflow-visible md:shadow-2xl ${
          open
            ? "max-h-96 opacity-100 md:translate-y-0 md:scale-100"
            : "pointer-events-none max-h-0 opacity-0 md:-translate-y-2 md:scale-95"
        }`}
      >
        <div className="flex items-center justify-center gap-3 p-3">
          {links.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setOpen(false)}
              aria-label={link.name}
              style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
              className={`group/item flex h-11 w-11 items-center justify-center rounded-lg transition-all duration-200 ease-out hover:bg-gray-50 ${
                open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors duration-200 ${link.hoverColorClass}`}
              >
                {link.icon}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}