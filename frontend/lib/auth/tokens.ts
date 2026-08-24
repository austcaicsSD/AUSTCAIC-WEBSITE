import { SignJWT, jwtVerify } from "jose";

export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

const ISSUER = "austcaic";
const AUDIENCE = "austcaic-admin";
const ALG = "HS256";

export type AdminClaims = {
  sub: string;
  tokenVersion: number;
};

export function getSecretKey(secret: string): Uint8Array {
  if (!secret || secret.length < 32) {
    throw new Error("AUTH_SECRET must be at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(
  claims: AdminClaims,
  secret: string,
  maxAgeSeconds: number = SESSION_MAX_AGE_SECONDS
): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  return new SignJWT({ tokenVersion: claims.tokenVersion })
    .setProtectedHeader({ alg: ALG, typ: "JWT" })
    .setSubject(claims.sub)
    .setIssuedAt(now)
    .setNotBefore(now)
    .setExpirationTime(now + maxAgeSeconds)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .sign(getSecretKey(secret));
}

export async function verifySessionToken(
  token: string,
  secret: string
): Promise<AdminClaims | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(secret), {
      issuer: ISSUER,
      audience: AUDIENCE,
      // Pinning the algorithm blocks "alg" substitution attacks.
      algorithms: [ALG],
    });

    if (typeof payload.sub !== "string") return null;
    if (typeof payload.tokenVersion !== "number") return null;

    return { sub: payload.sub, tokenVersion: payload.tokenVersion };
  } catch {
    return null;
  }
}
