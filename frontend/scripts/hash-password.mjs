// Generates a bcrypt hash to paste into the admins.passwordHash column in Supabase.
// The password is never echoed, never logged, and never leaves this machine.
import bcrypt from "bcryptjs";
import readline from "node:readline";
import { stdin, stdout } from "node:process";

const COST = 12;
const MIN_LENGTH = 12;

function promptHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: stdin, output: stdout, terminal: true });
    let muted = false;

    rl._writeToOutput = function (chunk) {
      if (!muted) rl.output.write(chunk);
    };

    rl.question(question, (answer) => {
      rl.close();
      stdout.write("\n");
      resolve(answer);
    });

    muted = true;
  });
}

function problems(pw) {
  const out = [];
  if (pw.length < MIN_LENGTH) out.push(`must be at least ${MIN_LENGTH} characters`);
  if (!/[a-z]/.test(pw)) out.push("needs a lowercase letter");
  if (!/[A-Z]/.test(pw)) out.push("needs an uppercase letter");
  if (!/[0-9]/.test(pw)) out.push("needs a digit");
  if (!/[^A-Za-z0-9]/.test(pw)) out.push("needs a symbol");
  return out;
}

const password = await promptHidden("New admin password (input hidden): ");
const issues = problems(password);

if (issues.length) {
  console.error("\nRejected:");
  issues.forEach((i) => console.error(`  - ${i}`));
  process.exit(1);
}

const confirm = await promptHidden("Confirm password: ");
if (confirm !== password) {
  console.error("\nPasswords do not match.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, COST);

console.log("\nPaste this into the admins.passwordHash column:\n");
console.log(hash);
console.log("\nAlso set: name, email (lowercase), isActive = true, tokenVersion = 0");
