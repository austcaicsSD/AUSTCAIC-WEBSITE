import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PanelView from "./PanelView";
import { semesterLabel } from "@/lib/semester";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ semester: string }>;
}): Promise<Metadata> {
  const { semester } = await params;
  const label = semesterLabel(semester);
  return {
    title: `Executive Panel — ${label}`,
    description: `Meet the AUSTCAIC executive committee for ${label}. See the team leading AUST's Cybersecurity and AI Club — the panel driving innovation, security research, and student leadership.`,
    alternates: {
      canonical: `https://austcaic.com/panel/${semester}`,
    },
  };
}


export default async function SemesterPanelPage({
  params,
}: {
  params: Promise<{ semester: string }>;
}) {
  const { semester } = await params;

  const rows = await prisma.panelMember.findMany({
    where: { semester },
    orderBy: [{ orderIndex: "asc" }, { name: "asc" }],
  });

  if (rows.length === 0) notFound();

  const members = rows.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.role,
    wing: m.wing,
    semester: m.semester,
    image: m.imageUrl ?? "/placeholder-user.svg",
  }));

  return <PanelView semesterSlug={semester} members={members} />;
}
