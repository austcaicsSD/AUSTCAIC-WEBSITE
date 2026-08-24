import Link from "next/link";
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
        className="rounded-lg px-3 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex max-w-7xl">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-gray-200 bg-white px-4 py-5 md:flex">
          <div className="px-3">
            <Brand />
          </div>

          <div className="mt-6 flex-1">
            <AdminNav />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="px-3 text-sm font-bold text-gray-900">{admin.name}</p>
            <p className="mb-2 px-3 text-xs text-gray-500">{admin.email}</p>
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              View site
            </Link>
            <LogoutButton />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-b border-gray-200 bg-white md:hidden">
            <div className="flex items-center justify-between px-5 py-3">
              <Brand />
              <LogoutButton />
            </div>
            <div className="px-5 pb-3">
              <AdminNav />
            </div>
          </header>

          <main className="px-5 py-8 md:px-10 md:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
