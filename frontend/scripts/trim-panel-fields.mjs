// Trims stray whitespace in panel_members text fields.
// Dry-run by default; pass --apply to write.
import { PrismaClient } from "@prisma/client";

const APPLY = process.argv.includes("--apply");
const prisma = new PrismaClient();

const FIELDS = ["name", "role", "wing", "semester", "memberId"];

const members = await prisma.panelMember.findMany();
const changes = [];

for (const m of members) {
  const data = {};
  for (const f of FIELDS) {
    const value = m[f];
    if (typeof value !== "string") continue;
    const cleaned = value.trim().replace(/\s{2,}/g, " ");
    if (cleaned !== value) data[f] = cleaned;
  }
  if (Object.keys(data).length > 0) changes.push({ id: m.id, name: m.name, data });
}

console.log(`${changes.length} of ${members.length} rows need trimming\n`);

const summary = new Map();
for (const c of changes) {
  for (const [field, to] of Object.entries(c.data)) {
    const key = `${field}: ${JSON.stringify(members.find((m) => m.id === c.id)[field])} -> ${JSON.stringify(to)}`;
    summary.set(key, (summary.get(key) ?? 0) + 1);
  }
}
for (const [k, n] of summary) console.log(`  ${String(n).padStart(3)}x  ${k}`);

if (!APPLY) {
  console.log("\nDry run. Re-run with --apply to write.");
} else {
  await prisma.$transaction(
    changes.map((c) =>
      prisma.panelMember.update({ where: { id: c.id }, data: c.data }),
    ),
  );
  console.log(`\nUpdated ${changes.length} rows.`);

  const roles = await prisma.panelMember.groupBy({
    by: ["role"],
    _count: { _all: true },
    orderBy: { role: "asc" },
  });
  console.log("\nroles now:");
  for (const r of roles) console.log(`${String(r._count._all).padStart(3)}  ${JSON.stringify(r.role)}`);
}

await prisma.$disconnect();
