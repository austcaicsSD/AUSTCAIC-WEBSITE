"use server";

import { z } from "zod";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";
import { writeAuditLog } from "@/lib/audit";
import { uploadGalleryImage, deleteGalleryImage } from "@/lib/storage/gallery-images";
import {
  galleryMomentSchema,
  readGalleryForm,
  type GalleryFormState,
} from "@/lib/validation/gallery";

// The public homepage renders with force-dynamic, so only the admin list
// needs an explicit revalidation.
function revalidateGallery() {
  revalidatePath("/admin/gallery");
}

function selectedPhoto(formData: FormData): File | null {
  const photo = formData.get("photo");
  return photo instanceof File && photo.size > 0 ? photo : null;
}

export async function createGalleryMoment(
  _prev: GalleryFormState,
  formData: FormData,
): Promise<GalleryFormState> {
  const admin = await requireAdmin();

  const values = readGalleryForm(formData);
  const parsed = galleryMomentSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  // The storage path is derived from the row id, so it is generated up front
  // and the photo is stored before the row exists - a failed insert then only
  // leaves an orphan object, which is cleaned up, rather than a moment row
  // pointing at a photo that was never written.
  const id = randomUUID();
  let image: { path: string; publicUrl: string } | null = null;

  const photo = selectedPhoto(formData);
  if (photo) {
    const upload = await uploadGalleryImage({ file: photo, momentId: id });
    if (!upload.ok) {
      return { fieldErrors: { photo: [upload.reason] }, values };
    }
    image = { path: upload.path, publicUrl: upload.publicUrl };
  }

  let created;
  try {
    created = await prisma.$transaction(async (tx) => {
      const moment = await tx.galleryMoment.create({
        data: {
          title: parsed.data.title,
          description: parsed.data.description,
          momentDate: new Date(parsed.data.momentDate),
          orderIndex: parsed.data.orderIndex,
          id,
          imageUrl: image?.publicUrl ?? null,
          imagePath: image?.path ?? null,
        },
      });
      await writeAuditLog(tx, {
        actor: admin,
        action: "gallery_moment.create",
        entityType: "GalleryMoment",
        entityId: moment.id,
        after: moment,
      });
      return moment;
    });
  } catch (error) {
    await deleteGalleryImage(image?.path ?? null);
    throw error;
  }

  revalidateGallery();
  redirect("/admin/gallery");
}

export async function updateGalleryMoment(
  id: string,
  _prev: GalleryFormState,
  formData: FormData,
): Promise<GalleryFormState> {
  const admin = await requireAdmin();

  const values = readGalleryForm(formData);
  const parsed = galleryMomentSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const before = await prisma.galleryMoment.findUnique({ where: { id } });
  if (!before) return { formError: "That moment no longer exists.", values };

  // Upload first, write second, delete the old object last: a failure at any
  // step leaves the moment with a photo that still resolves.
  let image: { path: string | null; publicUrl: string | null } = {
    path: before.imagePath,
    publicUrl: before.imageUrl,
  };
  let uploadedPath: string | null = null;

  const photo = selectedPhoto(formData);
  const removing = formData.get("removePhoto") === "on";

  if (photo) {
    const upload = await uploadGalleryImage({ file: photo, momentId: id });
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
      const moment = await tx.galleryMoment.update({
        where: { id },
        data: {
          title: parsed.data.title,
          description: parsed.data.description,
          momentDate: new Date(parsed.data.momentDate),
          orderIndex: parsed.data.orderIndex,
          imageUrl: image.publicUrl,
          imagePath: image.path,
        },
      });
      await writeAuditLog(tx, {
        actor: admin,
        action: "gallery_moment.update",
        entityType: "GalleryMoment",
        entityId: id,
        before,
        after: moment,
      });
      return moment;
    });
  } catch (error) {
    await deleteGalleryImage(uploadedPath);
    throw error;
  }

  if (before.imagePath && before.imagePath !== image.path) {
    await deleteGalleryImage(before.imagePath);
  }

  revalidateGallery();
  redirect("/admin/gallery");
}

export async function deleteGalleryMoment(id: string): Promise<void> {
  const admin = await requireAdmin();

  const before = await prisma.galleryMoment.findUnique({ where: { id } });
  if (!before) return;

  await prisma.$transaction(async (tx) => {
    await tx.galleryMoment.delete({ where: { id } });
    await writeAuditLog(tx, {
      actor: admin,
      action: "gallery_moment.delete",
      entityType: "GalleryMoment",
      entityId: id,
      before,
    });
  });

  // After the row is gone: a failure here leaves an unreferenced object, not a
  // moment whose photo has vanished.
  await deleteGalleryImage(before.imagePath);

  revalidateGallery();
}
