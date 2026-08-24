// Reconciles the hardcoded page roster into panel_members.
// Dry-run by default. Pass --apply to write.
//
// Rules:
//   - match on canonical name, never blind-insert a duplicate
//   - NEVER null out an existing imageUrl / imagePath
//   - never delete anything; orphans are reported only
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";

const APPLY = process.argv.includes("--apply");
const SEMESTER_SLUG = "fall-2025";
const SEMESTER_LABEL = "Fall 2025";

// db spelling  ->  canonical spelling we will standardise on
const NAME_CANON = {
  "Ahnaf Propat": "Ahanaf Propat",
  "Md. Shariful Haque": "Md. Shariful Haque",
  "MD. SHARIFUL HAQUE": "Md. Shariful Haque",
  "Shaila Islam": "Sanjida Islam Shaila",
  "MD Tariqul Islam Rafi": "Md Tariqul Islam Rafi",
  "Redowan Imran Sarkar": "Redowan Imran Sarker",
};

const ROLE_CANON = { Treasure: "Treasurer" };

const SKIP_NAMES = new Set(["To Be Announced"]);

const canon = (n) => NAME_CANON[n] ?? n;
const canonRole = (r) => ROLE_CANON[r] ?? r;

// ---------------------------------------------------------------- parse page
const src = readFileSync("app/panel/[semester]/page.tsx", "utf8");
const entryRe =
  /\{\s*id:\s*(\d+),\s*name:\s*"([^"]*)",\s*role:\s*"([^"]*)",\s*wing:\s*"([^"]*)",\s*semester:\s*"([^"]*)",\s*image:\s*"([^"]*)",?\s*\}/g;

const pageRoster = [...src.matchAll(entryRe)].map((m) => ({
  pageId: Number(m[1]),
  name: m[2],
  role: m[3],
  wing: m[4] || null,
  semester: m[5],
}));

console.log(`parsed ${pageRoster.length} entries from the page`);
if (pageRoster.length === 0) {
  console.error("PARSE FAILED - refusing to continue");
  process.exit(1);
}

const wanted = pageRoster
  .filter((e) => e.semester === SEMESTER_SLUG && !SKIP_NAMES.has(e.name))
  .map((e, i) => ({
    name: canon(e.name),
    role: canonRole(e.role),
    wing: e.wing,
    orderIndex: i,
  }));

const skipped = pageRoster.filter((e) => SKIP_NAMES.has(e.name));

// ------------------------------------------------------------------ load db
const prisma = new PrismaClient();
const dbRows = await prisma.panelMember.findMany({
  where: { semester: SEMESTER_SLUG },
});
const dbByCanon = new Map(dbRows.map((r) => [canon(r.name), r]));

// ------------------------------------------------------------------- plan
const inserts = [];
const updates = [];

for (const w of wanted) {
  const existing = dbByCanon.get(w.name);
  if (!existing) {
    inserts.push(w);
    continue;
  }
  const diff = {};
  if (existing.name !== w.name) diff.name = [existing.name, w.name];
  if (existing.role !== w.role) diff.role = [existing.role, w.role];
  if ((existing.wing ?? null) !== w.wing) diff.wing = [existing.wing, w.wing];
  if (existing.orderIndex !== w.orderIndex)
    diff.orderIndex = [existing.orderIndex, w.orderIndex];
  if (Object.keys(diff).length) updates.push({ id: existing.id, name: w.name, diff, target: w });
}

const wantedNames = new Set(wanted.map((w) => w.name));
const orphans = dbRows.filter((r) => !wantedNames.has(canon(r.name)));
// rows that need no field changes can still be missing the semester link
const needsLink = dbRows.filter((r) => !r.semesterId);

// ------------------------------------------------------------------ report
const line = (s) => console.log(s);
line("\n================ RECONCILIATION PLAN ================");
line(`semester            : ${SEMESTER_SLUG}`);
line(`page entries (used) : ${wanted.length}`);
line(`page entries skipped: ${skipped.length}  ${skipped.map((s) => `"${s.name}"`).join(", ")}`);
line(`db rows             : ${dbRows.length}`);

line(`\n--- INSERT (${inserts.length}) - new rows, imageUrl left null ---`);
inserts.forEach((i) => line(`  + "${i.name}"  [${i.role}]  wing=${i.wing ?? "-"}  order=${i.orderIndex}`));

line(`\n--- UPDATE (${updates.length}) - imageUrl / imagePath never touched ---`);
updates.forEach((u) => {
  const parts = Object.entries(u.diff).map(([k, [a, b]]) => `${k}: ${JSON.stringify(a)} -> ${JSON.stringify(b)}`);
  line(`  ~ "${u.name}"`);
  parts.forEach((p) => line(`      ${p}`));
});

line(`\n--- ORPHANS (${orphans.length}) - in db, not on page. NOT deleted ---`);
orphans.forEach((o) => line(`  ? "${o.name}"  [${o.role}]  hasImage=${Boolean(o.imageUrl)}`));

line(`\n--- SEMESTER LINK (${needsLink.length}) - rows missing semesterId ---`);

const imagesBefore = dbRows.filter((r) => r.imageUrl).length;
line(`\nrows with imageUrl before: ${imagesBefore}`);

// ------------------------------------------------------------------- apply
if (!APPLY) {
  line("\nDRY RUN - nothing written. Re-run with --apply to commit.\n");
  await prisma.$disconnect();
  process.exit(0);
}

line("\nAPPLYING...");
const semester = await prisma.semester.upsert({
  where: { slug: SEMESTER_SLUG },
  update: { label: SEMESTER_LABEL },
  create: { slug: SEMESTER_SLUG, label: SEMESTER_LABEL, isPublished: true, orderIndex: 0 },
});

await prisma.$transaction([
  ...inserts.map((i) =>
    prisma.panelMember.create({
      data: {
        name: i.name,
        role: i.role,
        wing: i.wing,
        semester: SEMESTER_SLUG,
        semesterId: semester.id,
        orderIndex: i.orderIndex,
      },
    })
  ),
  ...updates.map((u) =>
    prisma.panelMember.update({
      where: { id: u.id },
      data: {
        name: u.target.name,
        role: u.target.role,
        wing: u.target.wing,
        orderIndex: u.target.orderIndex,
        semesterId: semester.id,
      },
    })
  ),
  ...orphans.map((o) =>
    prisma.panelMember.update({
      where: { id: o.id },
      data: { semesterId: semester.id },
    })
  ),
  prisma.panelMember.updateMany({
    where: { semester: SEMESTER_SLUG, semesterId: null },
    data: { semesterId: semester.id },
  }),
]);

const after = await prisma.panelMember.findMany({ where: { semester: SEMESTER_SLUG } });
line(
  `\ndone. rows now: ${after.length}, with imageUrl: ${
    after.filter((r) => r.imageUrl).length
  }, linked to semester: ${after.filter((r) => r.semesterId).length}`
);

await prisma.$disconnect();
