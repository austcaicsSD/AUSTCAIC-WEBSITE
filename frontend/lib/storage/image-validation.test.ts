import test from "node:test";
import assert from "node:assert/strict";
import {
  MAX_UPLOAD_BYTES,
  sniffImageMime,
  validatePanelImage,
} from "./image-validation.ts";

const jpeg = (extra = 32) =>
  new Uint8Array([0xff, 0xd8, 0xff, 0xe0, ...new Array(extra).fill(0)]);

const png = (extra = 32) =>
  new Uint8Array([
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
    ...new Array(extra).fill(0),
  ]);

const webp = () =>
  new Uint8Array([
    ...[0x52, 0x49, 0x46, 0x46], // "RIFF"
    ...[0x00, 0x00, 0x00, 0x00], // size
    ...[0x57, 0x45, 0x42, 0x50], // "WEBP"
    ...[0x56, 0x50, 0x38, 0x20], // "VP8 "
  ]);

const bytesOf = (text: string) =>
  new Uint8Array([...text].map((c) => c.charCodeAt(0)));

test("accepts real JPEG, PNG and WebP bytes", () => {
  for (const [bytes, mime] of [
    [jpeg(), "image/jpeg"],
    [png(), "image/png"],
    [webp(), "image/webp"],
  ] as const) {
    const result = validatePanelImage({
      size: bytes.length,
      declaredMime: mime,
      bytes,
    });
    assert.deepEqual(result, { ok: true, mime });
  }
});

test("rejects a file over 5 MB", () => {
  const result = validatePanelImage({
    size: MAX_UPLOAD_BYTES + 1,
    declaredMime: "image/png",
    bytes: png(),
  });
  assert.equal(result.ok, false);
  assert.match(result.ok === false ? result.reason : "", /5 MB or smaller/);
});

test("rejects an empty file", () => {
  const result = validatePanelImage({
    size: 0,
    declaredMime: "image/png",
    bytes: new Uint8Array(),
  });
  assert.equal(result.ok, false);
});

test("rejects a script disguised as a .jpg", () => {
  const bytes = bytesOf("#!/bin/sh\nrm -rf / # totally a photo");
  const result = validatePanelImage({
    size: bytes.length,
    declaredMime: "image/jpeg",
    bytes,
  });
  assert.equal(result.ok, false);
  assert.match(result.ok === false ? result.reason : "", /not a real/);
});

test("rejects an SVG carrying a script, however it is labelled", () => {
  const bytes = bytesOf(
    '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>',
  );

  // Declared honestly: blocked by the MIME allow-list.
  const declared = validatePanelImage({
    size: bytes.length,
    declaredMime: "image/svg+xml",
    bytes,
  });
  assert.equal(declared.ok, false);

  // Declared as PNG to slip past the allow-list: blocked by the byte sniff.
  const spoofed = validatePanelImage({
    size: bytes.length,
    declaredMime: "image/png",
    bytes,
  });
  assert.equal(spoofed.ok, false);
  assert.match(spoofed.ok === false ? spoofed.reason : "", /not a real/);
});

test("rejects a GIF, which is not on the allow-list", () => {
  const bytes = bytesOf("GIF89a");
  const result = validatePanelImage({
    size: bytes.length,
    declaredMime: "image/gif",
    bytes,
  });
  assert.equal(result.ok, false);
});

test("sniff ignores the declared type entirely", () => {
  assert.equal(sniffImageMime(png()), "image/png");
  assert.equal(sniffImageMime(bytesOf("not an image at all")), null);
  assert.equal(sniffImageMime(new Uint8Array([0xff, 0xd8])), null);
});
