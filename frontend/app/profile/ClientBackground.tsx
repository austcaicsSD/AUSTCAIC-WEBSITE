"use client";

import { useEffect, useState } from "react";

export default function ClientBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Background Elements */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-70 fixed"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.05), transparent 80%)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0 fixed"></div>

      {/* Floating Ambient Orbs */}
      <div className="fixed top-1/4 left-1/4 w-[400px] h-[400px] bg-brandBlue/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none z-0"></div>
      <div
        className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brandPurple/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none z-0"
        style={{ animationDelay: "2s" }}
      ></div>
    </>
  );
}
