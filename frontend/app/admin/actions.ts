"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { clearAdminSession, createAdminSession } from "@/lib/auth/session";

const WINDOW_MINUTES = 15;
const MAX_FAILURES = 5;

// Comparing against this when the email is unknown keeps the response time
// similar to a real miss, so the form can't be used to enumerate admins.
const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEe.7Fj5nJ4Nf3Q0j3n9pC1rXqRj2b1sYtu";

export type LoginState = { message: string };

async function hashedIp(): Promise<string> {
  const h = await headers();
  const raw = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return createHash("sha256").update(raw).digest("hex").slice(0, 32);
}

export async function loginAdmin(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { message: "Email and password are required." };
  }

  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000);
  const recentFailures = await prisma.loginAttempt.count({
    where: { email, successful: false, createdAt: { gte: since } },
  });

  if (recentFailures >= MAX_FAILURES) {
    return {
      message: `Too many failed attempts. Try again in ${WINDOW_MINUTES} minutes.`,
    };
  }

  const admin = await prisma.admin.findUnique({ where: { email } });
  const passwordOk = await verifyPassword(
    password,
    admin?.passwordHash ?? DUMMY_HASH
  );
  const success = Boolean(admin && admin.isActive && passwordOk);

  await prisma.loginAttempt.create({
    data: { email, ipHash: await hashedIp(), successful: success },
  });

  if (!success || !admin) {
    return { message: "Invalid email or password." };
  }

  await prisma.admin.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
  });

  await createAdminSession({ sub: admin.id, tokenVersion: admin.tokenVersion });
  redirect("/admin");
}

export async function logoutAdmin(): Promise<void> {
  await clearAdminSession();
  redirect("/login?as=admin");
}
