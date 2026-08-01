"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { loginMember } from "../actions";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ================= ANIMATION COMPONENT =================
const FadeIn = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  const getDirectionClasses = () => {
    if (direction === "up") return "translate-y-12";
    if (direction === "left") return "-translate-x-12";
    if (direction === "right") return "translate-x-12";
    return "";
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${getDirectionClasses()}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function LoginPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // Handle form state with useActionState for React 19
  const [state, formAction, isPending] = useActionState(loginMember, {
    success: false,
    message: "",
  });

  // Redirect on success
  useEffect(() => {
    if (state?.success) {
      router.push("/dashboard");
    }
  }, [state, router]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full overflow-hidden bg-[#fafafa] text-gray-900 font-sans flex flex-col"
    >
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
        <FadeIn className="w-full max-w-lg">
          <div className="bg-white/70 backdrop-blur-2xl p-8 sm:p-12 rounded-[2.5rem] border border-white/50 shadow-2xl transition-all duration-500 hover:shadow-brandBlue/20">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gray-950 rounded-2xl flex items-center justify-center text-white shadow-lg transform rotate-3 mb-6">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  ></path>
                </svg>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
                Member Login
              </h1>
              <p className="text-gray-500 mt-2">
                Access your exclusive AUSTCAIC portal
              </p>
            </div>

            <form action={formAction} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-gray-700 mb-2 pl-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="e.g. hifzulalam26@gmail.com"
                  className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl outline-none focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="studentId"
                  className="block text-sm font-bold text-gray-700 mb-2 pl-1"
                >
                  Student ID
                </label>
                <input
                  type="text"
                  name="studentId"
                  id="studentId"
                  required
                  placeholder="e.g. 20220205006"
                  className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl outline-none focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label
                  htmlFor="memberId"
                  className="block text-sm font-bold text-gray-700 mb-2 pl-1"
                >
                  Member ID
                </label>
                <input
                  type="text"
                  name="memberId"
                  id="memberId"
                  required
                  placeholder="e.g. AUSTCAIC 25-02-007"
                  className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl outline-none focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20 transition-all font-medium text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {state?.message && !state.success && (
                <div className="px-4 py-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 flex items-center gap-2">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  {state.message}
                </div>
              )}

              <div
                className="pt-4"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gray-950 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-brandBlue/30 hover:-translate-y-1 transition-all duration-300 w-full disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  {isPending ? "Authenticating..." : "Login to Portal"}
                  {!isPending && (
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isHovered ? "translate-x-2" : ""
                      }`}
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
                  )}
                </button>
              </div>
            </form>

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
