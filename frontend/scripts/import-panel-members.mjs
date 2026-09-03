import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";

const prisma = new PrismaClient();
const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error("Usage: node scripts/import-panel-members.mjs <path-to-json>");
  process.exit(1);
}

const records = JSON.parse(readFileSync(jsonPath, "utf8"));

// A single trailing space in a role silently splits a group in two on the
// public page, so normalise before inserting rather than after.
const TEXT_FIELDS = ["name", "role", "wing", "semester", "memberId"];

const cleaned = records.map((record) => {
  const out = { ...record };
  for (const field of TEXT_FIELDS) {
    if (typeof out[field] === "string") {
      out[field] = out[field].trim().replace(/\s{2,}/g, " ");
    }
  }
  return out;
});

const touched = cleaned.filter((c, i) =>
  TEXT_FIELDS.some((f) => c[f] !== records[i][f]),
).length;
if (touched > 0) console.log(`Normalised whitespace in ${touched} record(s)`);

const result = await prisma.panelMember.createMany({ data: cleaned });
console.log(`Inserted ${result.count} panel_members rows`);

await prisma.$disconnect();
