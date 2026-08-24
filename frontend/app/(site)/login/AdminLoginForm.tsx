"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "@/app/admin/actions";

const initial: LoginState = { message: "" };

export default function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initial);

  return (
    <>
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brandBlue to-brandPurple rounded-2xl flex items-center justify-center text-white shadow-lg transform -rotate-3 mb-6">
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-950 tracking-tight">
          Admin Login
        </h1>
        <p className="text-gray-500 mt-2">
          Authorised committee members only
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        <div>
          <label
            htmlFor="adminEmail"
            className="block text-sm font-bold text-gray-700 mb-2 pl-1"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="adminEmail"
            autoComplete="username"
            required
            className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all font-medium text-gray-900 placeholder:text-gray-400"
          />
        </div>

        <div>
          <label
            htmlFor="adminPassword"
            className="block text-sm font-bold text-gray-700 mb-2 pl-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="adminPassword"
            autoComplete="current-password"
            required
            className="w-full px-5 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl outline-none focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20 transition-all font-medium text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {state.message && (
          <div
            role="alert"
            className="px-4 py-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl border border-red-100 flex items-center gap-2"
          >
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

        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 w-full bg-gradient-to-r from-brandBlue to-brandPurple text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-brandPurple/30 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
    </>
  );
}
