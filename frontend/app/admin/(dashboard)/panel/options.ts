import { prisma } from "@/lib/prisma";

/** Existing values, offered as datalist suggestions so naming stays consistent. */
export async function getPanelFormOptions() {
  const [semesters, roles, wings] = await Promise.all([
    prisma.panelMember.findMany({
      distinct: ["semester"],
      select: { semester: true },
      orderBy: { semester: "desc" },
    }),
    prisma.panelMember.findMany({
      distinct: ["role"],
      select: { role: true },
      orderBy: { role: "asc" },
    }),
    prisma.panelMember.findMany({
      distinct: ["wing"],
      select: { wing: true },
      where: { wing: { not: null } },
      orderBy: { wing: "asc" },
    }),
  ]);

  return {
    semesters: semesters.map((r) => r.semester),
    roles: roles.map((r) => r.role),
    wings: wings.flatMap((r) => (r.wing ? [r.wing] : [])),
  };
}
