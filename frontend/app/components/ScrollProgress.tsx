"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };

    const raf = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    // z-10 keeps the bar above the nav bar but below the dropdown panels,
    // which open downwards from inside the header.
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px]"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-brandBlue via-brandPurple to-blue-500 shadow-[0_0_12px_rgba(109,40,217,0.5)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
