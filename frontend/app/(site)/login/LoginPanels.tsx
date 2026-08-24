"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/app/components/FadeIn";
import MemberLoginForm from "./MemberLoginForm";
import AdminLoginForm from "./AdminLoginForm";

type Tab = "member" | "admin";

const TABS: { id: Tab; label: string }[] = [
  { id: "member", label: "Member" },
  { id: "admin", label: "Admin" },
];

export default function LoginPanels({ defaultTab }: { defaultTab: Tab }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tab, setTab] = useState<Tab>(defaultTab);

  return (
    <main
      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
      className="relative min-h-screen w-full overflow-hidden bg-[#fafafa] text-gray-900 font-sans flex flex-col"
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300 opacity-70"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.05), transparent 80%)`,
        }}
      />
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>

      <div className="fixed top-1/4 left-1/4 w-[400px] h-[400px] bg-brandBlue/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none z-0"></div>
      <div
        className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brandPurple/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none z-0"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <FadeIn className="w-full max-w-lg">
          <div className="bg-white/70 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] border border-white/50 shadow-2xl transition-all duration-500 hover:shadow-brandBlue/20">
            <div
              role="tablist"
              aria-label="Login type"
              className="mb-8 grid grid-cols-2 gap-1 rounded-2xl bg-gray-100/80 p-1"
            >
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  role="tab"
                  type="button"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={`rounded-xl py-3 text-sm font-bold transition-all ${
                    tab === id
                      ? "bg-white text-gray-950 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Remounts on switch so a failed attempt never leaks into the other form. */}
            {tab === "member" ? (
              <MemberLoginForm key="member" />
            ) : (
              <AdminLoginForm key="admin" />
            )}

            <div className="pt-8 mt-8 border-t border-gray-200/50 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-brandBlue transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
                Return to Homepage
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
