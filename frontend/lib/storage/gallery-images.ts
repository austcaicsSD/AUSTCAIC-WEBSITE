import "server-only";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import { validatePanelImage } from "./image-validation";

const BUCKET = "gallery-images";
const MAX_EDGE = 1600;

export type UploadResult =
  | { ok: true; path: string; publicUrl: string }
  | { ok: false; reason: string };

function storageClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set to manage gallery photos.",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const safeSegment = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9-]/g, "-");

/**
 * Re-encodes to WebP before storing, so whatever was uploaded is discarded and
 * only bytes sharp produced are ever served. The object name is derived from
 * the record and the content hash, never from the uploaded filename, and the
 * hash means replacing a photo writes a new object instead of overwriting the
 * old one - no stale CDN copies, and nothing is destroyed before the database
 * has been updated.
 */
export async function uploadGalleryImage(input: {
  file: File;
  momentId: string;
}): Promise<UploadResult> {
  const bytes = new Uint8Array(await input.file.arrayBuffer());

  const check = validatePanelImage({
    size: input.file.size,
    declaredMime: input.file.type,
    bytes,
  });
  if (!check.ok) return check;

  let webp: Buffer;
  try {
    webp = await sharp(bytes)
      .rotate() // bakes in EXIF orientation before the metadata is dropped
      .resize({
        width: MAX_EDGE,
        height: MAX_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return { ok: false, reason: "That image could not be processed." };
  }

  const digest = createHash("sha256").update(webp).digest("hex").slice(0, 12);
  const path = `${safeSegment(input.momentId)}-${digest}.webp`;

  const supabase = storageClient();
  const { error } = await supabase.storage.from(BUCKET).upload(path, webp, {
    contentType: "image/webp",
    cacheControl: "31536000",
    upsert: true,
  });

  if (error) {
    return { ok: false, reason: "The photo could not be uploaded." };
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { ok: true, path, publicUrl: data.publicUrl };
}

export async function deleteGalleryImage(path: string | null): Promise<void> {
  if (!path) return;
  await storageClient().storage.from(BUCKET).remove([path]);
}
