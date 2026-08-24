import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { SignJWT } from "jose";
import {
  getSecretKey,
  signSessionToken,
  verifySessionToken,
} from "./tokens.ts";

const SECRET = "x".repeat(43);
const CLAIMS = { sub: "admin-123", tokenVersion: 4 };

describe("session tokens", () => {
  test("round-trips valid claims", async () => {
    const token = await signSessionToken(CLAIMS, SECRET);
    assert.deepEqual(await verifySessionToken(token, SECRET), CLAIMS);
  });

  test("rejects a tampered payload", async () => {
    const token = await signSessionToken(CLAIMS, SECRET);
    const [h, p, s] = token.split(".");
    const payload = JSON.parse(Buffer.from(p, "base64url").toString());
    payload.tokenVersion = 999;
    const forged = Buffer.from(JSON.stringify(payload)).toString("base64url");
    assert.equal(await verifySessionToken(`${h}.${forged}.${s}`, SECRET), null);
  });

  test("rejects a token signed with a different secret", async () => {
    const token = await signSessionToken(CLAIMS, "y".repeat(43));
    assert.equal(await verifySessionToken(token, SECRET), null);
  });

  test("rejects an expired token", async () => {
    const token = await signSessionToken(CLAIMS, SECRET, -10);
    assert.equal(await verifySessionToken(token, SECRET), null);
  });

  test("rejects a token for another audience", async () => {
    const now = Math.floor(Date.now() / 1000);
    const token = await new SignJWT({ tokenVersion: 1 })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setSubject("admin-123")
      .setIssuedAt(now)
      .setExpirationTime(now + 3600)
      .setIssuer("austcaic")
      .setAudience("some-other-app")
      .sign(getSecretKey(SECRET));

    assert.equal(await verifySessionToken(token, SECRET), null);
  });

  test("rejects garbage", async () => {
    assert.equal(await verifySessionToken("not-a-jwt", SECRET), null);
    assert.equal(await verifySessionToken("", SECRET), null);
  });

  test("refuses a weak secret", () => {
    assert.throws(() => getSecretKey("short"), /at least 32/);
  });
});
