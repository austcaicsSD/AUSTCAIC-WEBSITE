import "server-only";
import type { Admin, Prisma } from "@prisma/client";

// Dates and Decimals are not valid JSON input for Prisma's Json columns.
function toJson(value: unknown): Prisma.InputJsonValue | undefined {
  if (value === undefined) return undefined;
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

/**
 * Takes a transaction client so the log is committed with the change it
 * describes - a mutation can never succeed without its audit row.
 */
export async function writeAuditLog(
  client: Prisma.TransactionClient,
  entry: {
    actor: Admin;
    action: string;
    entityType: string;
    entityId?: string | null;
    before?: unknown;
    after?: unknown;
  },
) {
  await client.auditLog.create({
    data: {
      actorId: entry.actor.id,
      actorEmail: entry.actor.email,
      action: entry.action,
      entityType: entry.entityType,
      entityId: entry.entityId ?? null,
      before: toJson(entry.before),
      after: toJson(entry.after),
    },
  });
}
