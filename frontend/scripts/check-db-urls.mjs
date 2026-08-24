// Verifies the pooled runtime URL and the direct migration URL both work.
import { PrismaClient } from "@prisma/client";

const results = {};

const pooled = new PrismaClient();
try {
  const [members, panel] = await Promise.all([
    pooled.member.count(),
    pooled.panelMember.count(),
  ]);
  results.pooledRuntime = { ok: true, members, panel };
} catch (e) {
  results.pooledRuntime = { ok: false, error: e.message.split("\n")[0] };
} finally {
  await pooled.$disconnect();
}

const direct = new PrismaClient({
  datasources: { db: { url: process.env.DIRECT_URL } },
});
try {
  const rows = await direct.$queryRaw`SELECT count(*)::int AS n FROM "_prisma_migrations"`;
  results.directMigrations = { ok: true, migrationRows: rows[0].n };
} catch (e) {
  results.directMigrations = { ok: false, error: e.message.split("\n")[0] };
} finally {
  await direct.$disconnect();
}

console.log(JSON.stringify(results, null, 2));
