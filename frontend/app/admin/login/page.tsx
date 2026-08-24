"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "../actions";

const initial: LoginState = { message: "" };

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAdmin, initial);

  return (
    <main className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight text-gray-950">
            AUST
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
              CAIC
            </span>{" "}
            Admin
          </h1>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Authorised committee members only
          </p>
        </div>

        <form
          action={formAction}
          className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-900 outline-none transition-all focus:border-brandPurple focus:ring-2 focus:ring-brandPurple/20"
            />
          </div>

          {state.message && (
            <p
              role="alert"
              className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-bold text-red-600"
            >
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-gradient-to-r from-brandBlue to-brandPurple py-3.5 text-sm font-bold text-white shadow-[0_8px_30px_rgba(29,78,216,0.3)] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isPending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
