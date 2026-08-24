import Link from "next/link";

// Unmatched URLs render against the root layout, which has no site chrome, so
// this page carries its own.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#fafafa] px-6 py-20 text-center">
      <meta name="robots" content="noindex" />
      <p className="text-sm font-black uppercase tracking-[0.18em] text-brandPurple">
        404
      </p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-950">
        Page not found
      </h1>
      <p className="mt-3 max-w-md font-medium text-gray-500">
        The page you were looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-gradient-to-r from-brandBlue to-brandPurple px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(29,78,216,0.25)] transition-all hover:-translate-y-0.5"
      >
        Back to homepage
      </Link>
    </main>
  );
}
