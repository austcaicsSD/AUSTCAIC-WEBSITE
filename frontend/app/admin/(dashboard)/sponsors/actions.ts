"use server";

import { z } from "zod";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";
import { writeAuditLog } from "@/lib/audit";
import { uploadSponsorImage, deleteSponsorImage } from "@/lib/storage/sponsor-images";
import {
  sponsorSchema,
  readSponsorForm,
  type SponsorFormState,
} from "@/lib/validation/sponsors";

// The public homepage renders with force-dynamic, so only the admin list
// needs an explicit revalidation.
function revalidateSponsors() {
  revalidatePath("/admin/sponsors");
}

function selectedPhoto(formData: FormData): File | null {
  const photo = formData.get("photo");
  return photo instanceof File && photo.size > 0 ? photo : null;
}

export async function createSponsor(
  _prev: SponsorFormState,
  formData: FormData,
): Promise<SponsorFormState> {
  const admin = await requireAdmin();

  const values = readSponsorForm(formData);
  const parsed = sponsorSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  // The storage path is derived from the row id, so it is generated up front
  // and the logo is stored before the row exists - a failed insert then only
  // leaves an orphan object, which is cleaned up, rather than a sponsor row
  // pointing at a logo that was never written.
  const id = randomUUID();
  let image: { path: string; publicUrl: string } | null = null;

  const photo = selectedPhoto(formData);
  if (photo) {
    const upload = await uploadSponsorImage({ file: photo, sponsorId: id });
    if (!upload.ok) {
      return { fieldErrors: { photo: [upload.reason] }, values };
    }
    image = { path: upload.path, publicUrl: upload.publicUrl };
  }

  let created;
  try {
    created = await prisma.$transaction(async (tx) => {
      const sponsor = await tx.sponsor.create({
        data: {
          name: parsed.data.name,
          type: parsed.data.type,
          websiteUrl: parsed.data.websiteUrl,
          orderIndex: parsed.data.orderIndex,
          id,
          imageUrl: image?.publicUrl ?? null,
          imagePath: image?.path ?? null,
        },
      });
      await writeAuditLog(tx, {
        actor: admin,
        action: "sponsor.create",
        entityType: "Sponsor",
        entityId: sponsor.id,
        after: sponsor,
      });
      return sponsor;
    });
  } catch (error) {
    await deleteSponsorImage(image?.path ?? null);
    throw error;
  }

  revalidateSponsors();
  redirect("/admin/sponsors");
}

export async function updateSponsor(
  id: string,
  _prev: SponsorFormState,
  formData: FormData,
): Promise<SponsorFormState> {
  const admin = await requireAdmin();

  const values = readSponsorForm(formData);
  const parsed = sponsorSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const before = await prisma.sponsor.findUnique({ where: { id } });
  if (!before) return { formError: "That sponsor no longer exists.", values };

  // Upload first, write second, delete the old object last: a failure at any
  // step leaves the sponsor with a logo that still resolves.
  let image: { path: string | null; publicUrl: string | null } = {
    path: before.imagePath,
    publicUrl: before.imageUrl,
  };
  let uploadedPath: string | null = null;

  const photo = selectedPhoto(formData);
  const removing = formData.get("removePhoto") === "on";

  if (photo) {
    const upload = await uploadSponsorImage({ file: photo, sponsorId: id });
    if (!upload.ok) {
      return { fieldErrors: { photo: [upload.reason] }, values };
    }
    uploadedPath = upload.path;
    image = { path: upload.path, publicUrl: upload.publicUrl };
  } else if (removing) {
    image = { path: null, publicUrl: null };
  }

  let after;
  try {
    after = await prisma.$transaction(async (tx) => {
      const sponsor = await tx.sponsor.update({
        where: { id },
        data: {
          name: parsed.data.name,
          type: parsed.data.type,
          websiteUrl: parsed.data.websiteUrl,
          orderIndex: parsed.data.orderIndex,
          imageUrl: image.publicUrl,
          imagePath: image.path,
        },
      });
      await writeAuditLog(tx, {
        actor: admin,
        action: "sponsor.update",
        entityType: "Sponsor",
        entityId: id,
        before,
        after: sponsor,
      });
      return sponsor;
    });
  } catch (error) {
    await deleteSponsorImage(uploadedPath);
    throw error;
  }

  if (before.imagePath && before.imagePath !== image.path) {
    await deleteSponsorImage(before.imagePath);
  }

  revalidateSponsors();
  redirect("/admin/sponsors");
}

export async function deleteSponsor(id: string): Promise<void> {
  const admin = await requireAdmin();

  const before = await prisma.sponsor.findUnique({ where: { id } });
  if (!before) return;

  await prisma.$transaction(async (tx) => {
    await tx.sponsor.delete({ where: { id } });
    await writeAuditLog(tx, {
      actor: admin,
      action: "sponsor.delete",
      entityType: "Sponsor",
      entityId: id,
      before,
    });
  });

  // After the row is gone: a failure here leaves an unreferenced object, not a
  // sponsor whose logo has vanished.
  await deleteSponsorImage(before.imagePath);

  revalidateSponsors();
}
