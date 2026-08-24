import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/require-admin";
import { logoutAdmin } from "../actions";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authoritative gate: re-checks the account exists, is active, and the
  // tokenVersion still matches.
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-black tracking-tight text-gray-950">
            AUST
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandBlue to-brandPurple">
              CAIC
            </span>{" "}
            Admin
          </span>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-500">
              {admin.name}
            </span>
            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-200"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
