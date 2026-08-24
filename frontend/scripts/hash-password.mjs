// Generates a bcrypt hash to paste into the admins.passwordHash column in Supabase.
// The password is never echoed, never logged, and never leaves this machine.
import bcrypt from "bcryptjs";
import { stdin, stdout } from "node:process";

const COST = 12;
const MIN_LENGTH = 12;

// Reads stdin in raw mode and echoes asterisks. readline's _writeToOutput hook
// swallowed the prompt itself on Windows terminals, leaving a blank screen with
// no sign that anything was being typed.
function promptHidden(question) {
  return new Promise((resolve, reject) => {
    if (!stdin.isTTY) {
      reject(new Error("Run this in an interactive terminal."));
      return;
    }

    stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");

    let value = "";

    const finish = (result) => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.removeListener("data", onData);
      stdout.write("\n");
      resolve(result);
    };

    const onData = (chunk) => {
      for (const char of chunk) {
        if (char === "\r" || char === "\n") {
          finish(value);
          return;
        }

        if (char === "\u0003") {
          stdout.write("\n");
          process.exit(130);
        }

        if (char === "\u007f" || char === "\b") {
          if (value.length > 0) {
            value = value.slice(0, -1);
            stdout.write("\b \b");
          }
          continue;
        }

        // Ignore control characters such as arrow-key escape sequences.
        if (char < " ") continue;

        value += char;
        stdout.write("*");
      }
    };

    stdin.on("data", onData);
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
