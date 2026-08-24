import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "AUST Cybersecurity and AI Club",
  description: "Official website of AUSTCAIC",
};

// Nav semester list is read from the DB; without this, statically prerendered
// pages would keep a build-time snapshot until the next deploy.
export const revalidate = 300;

const toLabel = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const rows = await prisma.panelMember.findMany({
    distinct: ["semester"],
    select: { semester: true },
    orderBy: { semester: "desc" },
  });

  const panelSemesters = rows.map((r) => ({
    id: r.semester,
    label: toLabel(r.semester),
  }));

  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="bg-gray-50 font-sans text-gray-900 antialiased flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full group/nav">
          <Navigation panelSemesters={panelSemesters} />
          <ScrollProgress />
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow z-10">{children}</main>

        {/* ================= FOOTER RESTORED ================= */}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
