"use client";

// Last resort: only renders when the root layout itself fails, so it must
// provide its own html and body.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-6 text-center font-sans">
        <h1 className="text-3xl font-black tracking-tight text-gray-950">
          The site hit an unexpected error
        </h1>
        <p className="mt-3 max-w-md font-medium text-gray-500">
          Please try again in a moment.
        </p>
        {error.digest && (
          <p className="mt-4 font-mono text-xs text-gray-400">
            Reference: {error.digest}
          </p>
        )}
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-xl bg-gray-950 px-6 py-3 text-sm font-bold text-white"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
