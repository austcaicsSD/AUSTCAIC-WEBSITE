import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PanelView from "./PanelView";

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
