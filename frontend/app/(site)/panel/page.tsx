import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function PanelRootPage() {
  // Most recently added member decides the default semester.
  const latest = await prisma.panelMember.findFirst({
    select: { semester: true },
    orderBy: { createdAt: "desc" },
  });

  if (!latest) notFound();

  redirect(`/panel/${latest.semester}`);
}
