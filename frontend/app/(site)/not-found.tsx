import Link from "next/link";

export default function SiteNotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 text-center">
      {/* The loading boundary streams first, so this responds 200 rather than
          404. Keep it out of the index instead of dropping the skeleton. */}
      <meta name="robots" content="noindex" />
      <p className="text-sm font-black uppercase tracking-[0.18em] text-brandPurple">
        404
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-gray-500">
        The link may be out of date, or the semester you are looking for has no
        committee published yet.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-xl bg-gradient-to-r from-brandBlue to-brandPurple px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(29,78,216,0.25)] transition-all hover:-translate-y-0.5"
        >
          Back to homepage
        </Link>
        <Link
          href="/panel"
          className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-50"
        >
          Executive committee
        </Link>
      </div>
    </main>
  );
}
