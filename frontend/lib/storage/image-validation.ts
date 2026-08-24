/**
 * Pure so it can be unit tested without credentials or a network. Deliberately
 * has no `server-only` import for that reason - it holds no secrets.
 */

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export type ImageValidation =
  | { ok: true; mime: AllowedMimeType }
  | { ok: false; reason: string };

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

const ascii = (bytes: Uint8Array, start: number, end: number) =>
  String.fromCharCode(...bytes.slice(start, end));

/** Trusts the bytes, not the filename or the browser-supplied type. */
export function sniffImageMime(bytes: Uint8Array): AllowedMimeType | null {
  if (
    bytes.length >= 3 &&
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff
  ) {
    return "image/jpeg";
  }

  if (
    bytes.length >= 8 &&
    PNG_SIGNATURE.every((byte, i) => bytes[i] === byte)
  ) {
    return "image/png";
  }

  if (
    bytes.length >= 12 &&
    ascii(bytes, 0, 4) === "RIFF" &&
    ascii(bytes, 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }

  return null;
}

export function validatePanelImage(input: {
  size: number;
  declaredMime: string;
  bytes: Uint8Array;
}): ImageValidation {
  if (input.size === 0) {
    return { ok: false, reason: "That file is empty." };
  }

  if (input.size > MAX_UPLOAD_BYTES) {
    return { ok: false, reason: "Images must be 5 MB or smaller." };
  }

  if (
    !(ALLOWED_MIME_TYPES as readonly string[]).includes(input.declaredMime)
  ) {
    return {
      ok: false,
      reason: "Only JPEG, PNG and WebP images are allowed.",
    };
  }

  const sniffed = sniffImageMime(input.bytes);
  if (!sniffed) {
    return {
      ok: false,
      reason: "That file is not a real JPEG, PNG or WebP image.",
    };
  }

  return { ok: true, mime: sniffed };
}
