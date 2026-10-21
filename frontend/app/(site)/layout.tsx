import Footer from "@/app/components/Footer";
import Navigation from "@/app/components/Navigation";
import ScrollProgress from "@/app/components/ScrollProgress";
import BackToTop from "@/app/components/BackToTop";
import { prisma } from "@/lib/prisma";
import { semesterLabel } from "@/lib/semester";

// Nav semester list is read from the DB on every request so it is always
// up-to-date. force-dynamic also prevents Next.js from statically prerendering
// child pages at build time, which would fire this layout's DB query for each
// page concurrently and exhaust the limited session-mode connection pool.
export const dynamic = "force-dynamic";


export default async function SiteLayout({
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
    label: semesterLabel(r.semester),
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full group/nav">
        <Navigation panelSemesters={panelSemesters} />
        <ScrollProgress />
      </header>

      <div className="flex-grow z-10">{children}</div>

      <Footer />
      <BackToTop />
    </div>
  );
}
