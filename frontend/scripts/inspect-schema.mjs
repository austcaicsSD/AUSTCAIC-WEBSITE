import { PrismaClient } from "@prisma/client";

const p = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL } },
});

const tables = await p.$queryRaw`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public' ORDER BY 1`;

const cols = await p.$queryRaw`
  SELECT column_name FROM information_schema.columns
  WHERE table_name = 'panel_members' ORDER BY 1`;

const counts = {
  member: await p.member.count(),
  panelMember: await p.panelMember.count(),
  semester: await p.semester.count(),
  panelWithImage: await p.panelMember.count({ where: { imageUrl: { not: null } } }),
  panelLinkedToSemester: await p.panelMember.count({ where: { semesterId: { not: null } } }),
};

console.log("tables:", tables.map((r) => r.table_name).join(", "));
console.log("panel_members cols:", cols.map((r) => r.column_name).join(", "));
console.log("counts:", counts);

const roles = await p.panelMember.groupBy({ by: ["role"], _count: true });
console.log("roles:", Object.fromEntries(roles.map((r) => [r.role, r._count])));

await p.$disconnect();
