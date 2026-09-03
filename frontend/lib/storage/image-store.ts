import "server-only";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { createClient } from "@supabase/supabase-js";
import { validatePanelImage } from "./image-validation";

export type UploadResult =
  | { ok: true; path: string; publicUrl: string }
  | { ok: false; reason: string };

function storageClient(purpose: string) {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      `SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set to manage ${purpose}.`,
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

const safeSegment = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9-]/g, "-");

/**
 * Shared upload pipeline. Re-encodes to WebP before storing, so whatever was
 * uploaded is discarded and only bytes sharp produced are ever served. The
 * object name is derived from the record id and the content hash, never from
 * the uploaded filename; the hash means replacing an image writes a new object
 * instead of overwriting the old one, so nothing is destroyed before the
 * database has been updated.
 */
export function createImageStore(options: {
  bucket: string;
  maxEdge: number;
  purpose: string;
  /** Subfolder inside the bucket; omit to store at the root. */
  folder?: (input: { id: string }) => string | null;
}) {
  const { bucket, maxEdge, purpose } = options;

  async function upload(input: {
    file: File;
    id: string;
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
          width: maxEdge,
          height: maxEdge,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 82 })
        .toBuffer();
    } catch {
      return { ok: false, reason: "That image could not be processed." };
    }

    const digest = createHash("sha256").update(webp).digest("hex").slice(0, 12);
    const folder = options.folder?.(input);
    const name = `${safeSegment(input.id)}-${digest}.webp`;
    const path = folder ? `${safeSegment(folder)}/${name}` : name;

    const supabase = storageClient(purpose);
    const { error } = await supabase.storage.from(bucket).upload(path, webp, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: true,
    });

    if (error) {
      return { ok: false, reason: `The ${purpose} could not be uploaded.` };
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return { ok: true, path, publicUrl: data.publicUrl };
  }

  async function remove(path: string | null): Promise<void> {
    if (!path) return;
    await storageClient(purpose).storage.from(bucket).remove([path]);
  }

  return { upload, remove };
}
