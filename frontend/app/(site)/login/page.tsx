import LoginPanels from "./LoginPanels";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ as?: string }>;
}) {
  // ?as=admin lets the admin guards send people straight to the right tab.
  const { as } = await searchParams;

  return <LoginPanels defaultTab={as === "admin" ? "admin" : "member"} />;
}
