// Creates or updates an admin account directly, so nobody has to copy a bcrypt
// hash by hand. Run with: node --env-file=.env scripts/create-admin.mjs
import { randomUUID } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { promptHidden, promptLine, passwordProblems } from "./prompt.mjs";

const COST = 12;
const prisma = new PrismaClient();

function fail(message) {
  console.error(`\n${message}`);
  process.exitCode = 1;
}

try {
  const name = await promptLine("Full name: ");
  if (name.length < 2) throw new Error("Name is required.");

  const email = (await promptLine("Email: ")).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("That does not look like an email address.");
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    const answer = await promptLine(
      `${email} already exists. Reset the password? (yes/no): `,
    );
    if (answer.toLowerCase() !== "yes") {
      console.log("Nothing changed.");
      process.exit(0);
    }
  }

  const password = await promptHidden("Password (hidden): ");
  const problems = passwordProblems(password);
  if (problems.length > 0) {
    throw new Error(`Rejected:\n  - ${problems.join("\n  - ")}`);
  }

  const confirm = await promptHidden("Confirm password: ");
  if (confirm !== password) throw new Error("Passwords do not match.");

  const passwordHash = await bcrypt.hash(password, COST);

  if (existing) {
    // Bumping tokenVersion signs out any session issued before the reset.
    await prisma.admin.update({
      where: { email },
      data: {
        name,
        passwordHash,
        isActive: true,
        tokenVersion: existing.tokenVersion + 1,
      },
    });
    console.log(`\nPassword reset for ${email}. Existing sessions are now invalid.`);
  } else {
    // id has no database default; Prisma's uuid() is generated client-side.
    await prisma.admin.create({
      data: { id: randomUUID(), name, email, passwordHash },
    });
    console.log(`\nCreated admin ${email}.`);
  }

  console.log("Sign in at /login and choose the Admin tab.");
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
} finally {
  await prisma.$disconnect();
}
