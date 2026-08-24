"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginMember } from "@/app/actions";

export default function MemberLoginForm() {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(loginMember, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state?.success) {
      router.push("/profile");
    }
  }, [state, router]);

  return (
    <>
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
            className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl outline-none focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20 transition-all font-medium text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {state?.message && !state.success && (
          <div className="px-4 py-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 flex items-center gap-2">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
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
    </>
  );
}
