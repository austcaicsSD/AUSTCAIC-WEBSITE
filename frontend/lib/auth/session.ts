import "server-only";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "./cookie-name";
import {
  SESSION_MAX_AGE_SECONDS,
  signSessionToken,
  verifySessionToken,
  type AdminClaims,
} from "./tokens";

export const ADMIN_COOKIE = ADMIN_COOKIE_NAME;

function authSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return secret;
}

// Scoped to /admin so the cookie is never sent with public page requests.
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/admin",
};

export async function createAdminSession(claims: AdminClaims): Promise<void> {
  const token = await signSessionToken(claims, authSecret());
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    ...COOKIE_OPTIONS,
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "", { ...COOKIE_OPTIONS, maxAge: 0 });
}

export async function readAdminClaims(): Promise<AdminClaims | null> {
  const store = await cookies();
  const token = store.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token, authSecret());
}
