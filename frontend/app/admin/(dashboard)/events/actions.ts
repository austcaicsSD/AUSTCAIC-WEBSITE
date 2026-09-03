"use server";

import { z } from "zod";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";
import { writeAuditLog } from "@/lib/audit";
import { uploadEventImage, deleteEventImage } from "@/lib/storage/event-images";
import {
  eventSchema,
  readEventForm,
  type EventFormState,
} from "@/lib/validation/events";

// The public homepage renders with force-dynamic, so only the admin list
// needs an explicit revalidation.
function revalidateEvents() {
  revalidatePath("/admin/events");
}

function selectedPhoto(formData: FormData): File | null {
  const photo = formData.get("photo");
  return photo instanceof File && photo.size > 0 ? photo : null;
}

export async function createEvent(
  _prev: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const admin = await requireAdmin();

  const values = readEventForm(formData);
  const parsed = eventSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  // The storage path is derived from the row id, so it is generated up front
  // and the photo is stored before the row exists - a failed insert then only
  // leaves an orphan object, which is cleaned up, rather than an event row
  // pointing at a photo that was never written.
  const id = randomUUID();
  let image: { path: string; publicUrl: string } | null = null;

  const photo = selectedPhoto(formData);
  if (photo) {
    const upload = await uploadEventImage({ file: photo, eventId: id });
    if (!upload.ok) {
      return { fieldErrors: { photo: [upload.reason] }, values };
    }
    image = { path: upload.path, publicUrl: upload.publicUrl };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const event = await tx.event.create({
        data: {
          ...parsed.data,
          id,
          imageUrl: image?.publicUrl ?? null,
          imagePath: image?.path ?? null,
        },
      });
      await writeAuditLog(tx, {
        actor: admin,
        action: "event.create",
        entityType: "Event",
        entityId: event.id,
        after: event,
      });
    });
  } catch (error) {
    await deleteEventImage(image?.path ?? null);
    throw error;
  }

  revalidateEvents();
  redirect("/admin/events");
}

export async function updateEvent(
  id: string,
  _prev: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  const admin = await requireAdmin();

  const values = readEventForm(formData);
  const parsed = eventSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const before = await prisma.event.findUnique({ where: { id } });
  if (!before) return { formError: "That event no longer exists.", values };

  // Upload first, write second, delete the old object last: a failure at any
  // step leaves the event with a photo that still resolves.
  let image: { path: string | null; publicUrl: string | null } = {
    path: before.imagePath,
    publicUrl: before.imageUrl,
  };
  let uploadedPath: string | null = null;

  const photo = selectedPhoto(formData);
  const removing = formData.get("removePhoto") === "on";

  if (photo) {
    const upload = await uploadEventImage({ file: photo, eventId: id });
    if (!upload.ok) {
      return { fieldErrors: { photo: [upload.reason] }, values };
    }
    uploadedPath = upload.path;
    image = { path: upload.path, publicUrl: upload.publicUrl };
  } else if (removing) {
    image = { path: null, publicUrl: null };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const event = await tx.event.update({
        where: { id },
        data: {
          ...parsed.data,
          imageUrl: image.publicUrl,
          imagePath: image.path,
        },
      });
      await writeAuditLog(tx, {
        actor: admin,
        action: "event.update",
        entityType: "Event",
        entityId: id,
        before,
        after: event,
      });
    });
  } catch (error) {
    await deleteEventImage(uploadedPath);
    throw error;
  }

  if (before.imagePath && before.imagePath !== image.path) {
    await deleteEventImage(before.imagePath);
  }

  revalidateEvents();
  redirect("/admin/events");
}

export async function deleteEvent(id: string): Promise<void> {
  const admin = await requireAdmin();

  const before = await prisma.event.findUnique({ where: { id } });
  if (!before) return;

  await prisma.$transaction(async (tx) => {
    await tx.event.delete({ where: { id } });
    await writeAuditLog(tx, {
      actor: admin,
      action: "event.delete",
      entityType: "Event",
      entityId: id,
      before,
    });
  });

  // After the row is gone: a failure here leaves an unreferenced object, not an
  // event whose photo has vanished.
  await deleteEventImage(before.imagePath);

  revalidateEvents();
}
