// Docker-free logical backup: dumps every table to JSON and to replayable SQL INSERTs.
// Pair with `prisma migrate diff` output for the schema half.
import { PrismaClient } from "@prisma/client";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const prisma = new PrismaClient();
const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const outDir = resolve(process.cwd(), "..", "backups");
mkdirSync(outDir, { recursive: true });

const TABLES = [
  { model: "member", sqlTable: '"Member"' },
  { model: "panelMember", sqlTable: '"panel_members"' },
];

function sqlLiteral(v) {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (v instanceof Date) return `'${v.toISOString()}'`;
  return `'${String(v).replace(/'/g, "''")}'`;
}

const dump = {};
const sqlParts = [
  "-- AUSTCAIC logical backup",
  `-- generated ${new Date().toISOString()}`,
  "BEGIN;",
];
const counts = {};

for (const { model, sqlTable } of TABLES) {
  const rows = await prisma[model].findMany();
  dump[model] = rows;
  counts[sqlTable] = rows.length;

  sqlParts.push(`\n-- ${sqlTable} (${rows.length} rows)`);
  for (const row of rows) {
    const cols = Object.keys(row);
    sqlParts.push(
      `INSERT INTO ${sqlTable} (${cols.map((c) => `"${c}"`).join(", ")}) VALUES (${cols
        .map((c) => sqlLiteral(row[c]))
        .join(", ")});`
    );
  }
}

sqlParts.push("\nCOMMIT;");

const jsonPath = resolve(outDir, `data-${stamp}.json`);
const sqlPath = resolve(outDir, `data-${stamp}.sql`);
writeFileSync(jsonPath, JSON.stringify({ generatedAt: new Date().toISOString(), counts, data: dump }, null, 2), "utf8");
writeFileSync(sqlPath, sqlParts.join("\n"), "utf8");

console.log("ROW COUNTS:", counts);
console.log("wrote", jsonPath);
console.log("wrote", sqlPath);

await prisma.$disconnect();
