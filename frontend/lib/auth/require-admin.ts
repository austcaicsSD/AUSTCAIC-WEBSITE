import "server-only";
import type { Admin } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { readAdminClaims } from "./session";

/**
 * Authoritative check. A valid signature is not enough: the account must still
 * exist, still be active, and its tokenVersion must match the one in the cookie.
 */
export async function getCurrentAdmin(): Promise<Admin | null> {
  const claims = await readAdminClaims();
  if (!claims) return null;

  const admin = await prisma.admin.findUnique({ where: { id: claims.sub } });
  if (!admin) return null;
  if (!admin.isActive) return null;
  if (admin.tokenVersion !== claims.tokenVersion) return null;

  return admin;
}

/** For server actions - every mutation must call this itself. */
export async function requireAdmin(): Promise<Admin> {
  const admin = await getCurrentAdmin();
  if (!admin) throw new Error("Unauthorised");
  return admin;
}
