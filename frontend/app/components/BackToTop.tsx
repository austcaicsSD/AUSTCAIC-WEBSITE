"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => setShow(window.scrollY > 600);
    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <button
      type="button"
      // bottom-24 on mobile clears the syllabus floating CTA
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label="Back to top"
      className={`fixed bottom-24 right-5 sm:bottom-6 sm:right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gray-950 text-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brandPurple focus-visible:ring-offset-2 ${
        show
          ? "opacity-100 translate-y-0"
          : "pointer-events-none opacity-0 translate-y-4"
      }`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
}
