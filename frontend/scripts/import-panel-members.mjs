import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";

const prisma = new PrismaClient();
const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error("Usage: node scripts/import-panel-members.mjs <path-to-json>");
  process.exit(1);
}

const records = JSON.parse(readFileSync(jsonPath, "utf8"));

const result = await prisma.panelMember.createMany({ data: records });
console.log(`Inserted ${result.count} panel_members rows`);

await prisma.$disconnect();
