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
};

console.log("tables:", tables.map((r) => r.table_name).join(", "));
console.log("panel_members cols:", cols.map((r) => r.column_name).join(", "));
console.log("counts:", counts);

await p.$disconnect();
