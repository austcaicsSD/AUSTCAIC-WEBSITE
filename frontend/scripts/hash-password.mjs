// For admins without database access: generates a hash to hand over, and the
// exact SQL to run. The password is never echoed, logged, or sent anywhere.
// Whoever holds the connection string should use create-admin.mjs instead.
import bcrypt from "bcryptjs";
import { promptHidden, promptLine, passwordProblems } from "./prompt.mjs";

const COST = 12;

const name = await promptLine("Full name: ");
const email = (await promptLine("Email: ")).toLowerCase();

const password = await promptHidden("Password (hidden): ");
const problems = passwordProblems(password);

if (problems.length > 0) {
  console.error("\nRejected:");
  problems.forEach((p) => console.error(`  - ${p}`));
  process.exit(1);
}

const confirm = await promptHidden("Confirm password: ");
if (confirm !== password) {
  console.error("\nPasswords do not match.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, COST);
const escape = (value) => value.replace(/'/g, "''");

// Printed complete so nobody has to splice a hash into a placeholder - doing
// that by hand is how a stray angle bracket ends up inside the stored value.
console.log("\nRun this in the Supabase SQL editor:\n");
console.log(
  `insert into admins (id, name, email, "passwordHash")\n` +
    `values (gen_random_uuid()::text, '${escape(name)}', '${escape(email)}', '${hash}');`,
);
console.log(
  "\nThe hash must be exactly 60 characters starting $2b$12$ - copy the whole statement.",
);
