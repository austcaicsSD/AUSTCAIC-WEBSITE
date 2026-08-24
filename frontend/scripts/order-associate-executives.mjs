// Assigns deterministic orderIndex values to Associate Executives.
// Dry-run by default; pass --apply to write.
import { PrismaClient } from "@prisma/client";

const APPLY = process.argv.includes("--apply");
const SEMESTER = "fall-2025";
const ROLE = "Associate Executive";

// Preserved from the manual sort on main (commit 583bcd5).
const PINNED_FIRST = ["Mahim Abdullah Rianto", "Md Tanjimul Islam"];

const prisma = new PrismaClient();

const others = await prisma.panelMember.findMany({
  where: { semester: SEMESTER, role: { not: ROLE } },
  select: { orderIndex: true },
  orderBy: { orderIndex: "desc" },
  take: 1,
});
const start = (others[0]?.orderIndex ?? -1) + 1;

const rows = await prisma.panelMember.findMany({
  where: { semester: SEMESTER, role: ROLE },
  orderBy: { createdAt: "asc" },
});

const pinned = PINNED_FIRST.map((n) =>
  rows.find((r) => r.name.trim() === n)
).filter(Boolean);
const rest = rows.filter((r) => !PINNED_FIRST.includes(r.name.trim()));
const ordered = [...pinned, ...rest];

console.log(`${ROLE}: ${rows.length} rows, numbering from ${start}\n`);
ordered.forEach((r, i) => {
  const pin = PINNED_FIRST.includes(r.name.trim()) ? "  <- pinned" : "";
  console.log(`  ${String(start + i).padStart(2)}  ${r.orderIndex} -> ${start + i}  "${r.name}"${pin}`);
});

const missing = PINNED_FIRST.filter((n) => !rows.some((r) => r.name.trim() === n));
if (missing.length) console.log("\nWARNING pinned names not found:", missing);

if (!APPLY) {
  console.log("\nDRY RUN - nothing written.");
} else {
  await prisma.$transaction(
    ordered.map((r, i) =>
      prisma.panelMember.update({ where: { id: r.id }, data: { orderIndex: start + i } })
    )
  );
  console.log("\napplied.");
}

await prisma.$disconnect();
