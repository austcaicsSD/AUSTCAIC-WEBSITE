// Deactivates or reactivates an admin without deleting the audit trail.
// Run with: node --env-file=.env scripts/set-admin-active.mjs <email> <on|off>
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const [email, state] = process.argv.slice(2);

if (!email || !["on", "off"].includes(state)) {
  console.error("Usage: node --env-file=.env scripts/set-admin-active.mjs <email> <on|off>");
  process.exit(1);
}

const admin = await prisma.admin.findUnique({
  where: { email: email.toLowerCase() },
});

if (!admin) {
  console.error(`No admin found for ${email}.`);
  process.exit(1);
}

const isActive = state === "on";

await prisma.admin.update({
  where: { id: admin.id },
  // Bumping tokenVersion cuts off any session already issued.
  data: { isActive, tokenVersion: admin.tokenVersion + 1 },
});

console.log(`${admin.email} is now ${isActive ? "active" : "deactivated"}.`);
console.log("Any existing session for this account has been invalidated.");

await prisma.$disconnect();
