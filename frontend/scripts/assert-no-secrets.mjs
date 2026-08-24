// Fails the build if a server-side secret was inlined into a client bundle.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const CLIENT_DIR = ".next/static";

// new URL() rejects some valid connection strings, so fall back to a regex -
// a check that silently skips itself is worse than no check at all.
function passwordOf(url) {
  try {
    const parsed = new URL(url).password;
    if (parsed) return decodeURIComponent(parsed);
  } catch {
    // fall through
  }

  const match = /^[a-z+]+:\/\/[^:/@]+:([^@]+)@/i.exec(url);
  return match ? decodeURIComponent(match[1]) : null;
}

const candidates = [
  ["SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY],
  ["AUTH_SECRET", process.env.AUTH_SECRET],
  ["DATABASE_URL password", passwordOf(process.env.DATABASE_URL ?? "")],
  ["DIRECT_URL password", passwordOf(process.env.DIRECT_URL ?? "")],
];

// Short values would collide with ordinary bundle content.
const secrets = candidates.filter(([, value]) => value && value.length >= 12);
const skipped = candidates.filter(([, value]) => !value || value.length < 12);

function* files(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) yield* files(path);
    else yield path;
  }
}

let leaked = 0;

try {
  for (const path of files(CLIENT_DIR)) {
    const contents = readFileSync(path, "latin1");
    for (const [name, value] of secrets) {
      if (contents.includes(value)) {
        console.error(`LEAK: ${name} appears in ${path}`);
        leaked += 1;
      }
    }
  }
} catch (error) {
  if (error.code === "ENOENT") {
    console.error(`Cannot verify bundles: ${CLIENT_DIR} does not exist.`);
    process.exit(1);
  }
  throw error;
}

if (leaked > 0) {
  console.error(`\n${leaked} secret(s) leaked into the client bundle.`);
  process.exit(1);
}

const checked = secrets.map(([name]) => name).join(", ") || "nothing";
console.log(`Client bundle clean - checked for: ${checked}.`);
if (skipped.length > 0) {
  console.log(`Not set locally, so not checked: ${skipped.map(([n]) => n).join(", ")}.`);
}
