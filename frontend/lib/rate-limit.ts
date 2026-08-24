import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

/** Reuses the login_attempts table; keys are namespaced so scopes never collide. */
export async function hashedIp(): Promise<string> {
  const h = await headers();
  const raw = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return createHash("sha256").update(raw).digest("hex").slice(0, 32);
}

export async function isRateLimited(
  key: string,
  maxAttempts: number,
  windowMinutes: number,
  { countSuccessful = false } = {},
): Promise<boolean> {
  const since = new Date(Date.now() - windowMinutes * 60_000);

  const attempts = await prisma.loginAttempt.count({
    where: {
      email: key,
      createdAt: { gte: since },
      ...(countSuccessful ? {} : { successful: false }),
    },
  });

  return attempts >= maxAttempts;
}

export async function recordAttempt(
  key: string,
  successful: boolean,
): Promise<void> {
  await prisma.loginAttempt.create({
    data: { email: key, ipHash: await hashedIp(), successful },
  });
}
