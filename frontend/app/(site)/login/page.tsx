import type { Metadata } from "next";
import LoginPanels from "./LoginPanels";

// Never statically prerender — avoids triggering the site layout's DB query
// at build time and competing for the limited session-mode connection pool.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Member Login",
  description: "Sign in to your AUSTCAIC member account or access the staff admin panel.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ as?: string }>;
}) {
  // ?as=admin lets the admin guards send people straight to the right tab.
  const { as } = await searchParams;

  return <LoginPanels defaultTab={as === "admin" ? "admin" : "member"} />;
}
