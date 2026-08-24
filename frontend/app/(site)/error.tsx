"use client";

import Link from "next/link";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-brandPurple">
        Something broke
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
        This page didn&apos;t load
      </h1>
      <p className="mt-3 max-w-md text-gray-500">
        The problem has been logged. Try again, and if it keeps happening let
        the committee know.
      </p>

      {error.digest && (
        <p className="mt-4 font-mono text-xs text-gray-400">
          Reference: {error.digest}
        </p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-gradient-to-r from-brandBlue to-brandPurple px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(29,78,216,0.25)] transition-all hover:-translate-y-0.5"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
