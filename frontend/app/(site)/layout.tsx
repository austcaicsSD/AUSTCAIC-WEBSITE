import Footer from "@/app/components/Footer";
import Navigation from "@/app/components/Navigation";
import ScrollProgress from "@/app/components/ScrollProgress";
import BackToTop from "@/app/components/BackToTop";
import AnnouncementBar from "@/app/components/AnnouncementBar";
import { prisma } from "@/lib/prisma";
import { semesterLabel } from "@/lib/semester";

// Nav semester list is read from the DB; without this, statically prerendered
// pages would keep a build-time snapshot until the next deploy.
export const revalidate = 300;

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
      <AnnouncementBar />
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
