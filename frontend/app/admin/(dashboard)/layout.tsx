import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/require-admin";
import { logoutAdmin } from "../actions";
import { AdminNav } from "../_components/AdminNav";

function Brand() {
  return (
    <span className="text-lg font-black tracking-tight text-gray-950">
      AUST
      <span className="bg-gradient-to-r from-brandBlue to-brandPurple bg-clip-text text-transparent">
        CAIC
      </span>{" "}
      Admin
    </span>
  );
}

function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <button
        type="submit"
        className="w-full rounded-xl px-4 py-2.5 text-left text-sm font-bold text-gray-600 transition-colors hover:bg-gray-900/5 hover:text-gray-950"
      >
        Log out
      </button>
    </form>
  );
}

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authoritative gate: re-checks the account exists, is active, and the
  // tokenVersion still matches.
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/login?as=admin");

  return (
    <div className="relative min-h-screen bg-[#fafafa]">
      {/* Same ambient treatment as the public site, dialled down so tables stay legible. */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none fixed -left-40 -top-40 z-0 h-[500px] w-[500px] rounded-full bg-brandBlue/10 blur-[120px]" />
      <div className="pointer-events-none fixed -bottom-40 -right-40 z-0 h-[500px] w-[500px] rounded-full bg-brandPurple/10 blur-[120px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/60 bg-white/60 px-5 py-6 backdrop-blur-2xl md:flex">
          <div className="px-3">
            <Brand />
          </div>

          <div className="mt-8 flex-1">
            <AdminNav />
          </div>

          <div className="rounded-2xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm">
            <p className="text-sm font-black tracking-tight text-gray-950">
              {admin.name}
            </p>
            <p className="mb-3 truncate text-xs font-medium text-gray-500">
              {admin.email}
            </p>
            {/* New tab: the session cookie is scoped to /admin, so the public
                site cannot show a way back and this would strand the admin. */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-900/5 hover:text-gray-950"
            >
              View site
              <svg
                className="h-3.5 w-3.5 opacity-60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <LogoutButton />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 border-b border-white/60 bg-white/80 backdrop-blur-2xl md:hidden">
            <div className="flex items-center justify-between px-5 py-3">
              <Brand />
              <div className="w-24">
                <LogoutButton />
              </div>
            </div>
            <div className="px-5 pb-3">
              <AdminNav />
            </div>
          </header>

          <main className="px-5 py-10 md:px-10 md:py-12">{children}</main>
        </div>
      </div>
    </div>
  );
}
