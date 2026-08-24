"use server";

import { z } from "zod";
import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";
import { writeAuditLog } from "@/lib/audit";
import { uploadPanelImage, deletePanelImage } from "@/lib/storage/panel-images";
import {
  panelMemberSchema,
  readPanelForm,
  type PanelFormState,
} from "@/lib/validation/panel";

// Public route and the nav's semester list both read this data.
function revalidatePanel(...semesters: string[]) {
  revalidatePath("/admin/panel");
  for (const semester of new Set(semesters)) {
    revalidatePath(`/panel/${semester}`);
  }
  revalidatePath("/", "layout");
}

function selectedPhoto(formData: FormData): File | null {
  const photo = formData.get("photo");
  return photo instanceof File && photo.size > 0 ? photo : null;
}

export async function createPanelMember(
  _prev: PanelFormState,
  formData: FormData,
): Promise<PanelFormState> {
  const admin = await requireAdmin();

  const values = readPanelForm(formData);
  const parsed = panelMemberSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  // The storage path is derived from the row id, so it is generated up front
  // and the photo is stored before the row exists - a failed insert then only
  // leaves an orphan object, which is cleaned up, rather than a member row
  // pointing at a photo that was never written.
  const id = randomUUID();
  let image: { path: string; publicUrl: string } | null = null;

  const photo = selectedPhoto(formData);
  if (photo) {
    const upload = await uploadPanelImage({
      file: photo,
      semester: parsed.data.semester,
      memberId: id,
    });
    if (!upload.ok) {
      return { fieldErrors: { photo: [upload.reason] }, values };
    }
    image = { path: upload.path, publicUrl: upload.publicUrl };
  }

  let created;
  try {
    created = await prisma.$transaction(async (tx) => {
      const member = await tx.panelMember.create({
        data: {
          ...parsed.data,
          id,
          imageUrl: image?.publicUrl ?? null,
          imagePath: image?.path ?? null,
        },
      });
      await writeAuditLog(tx, {
        actor: admin,
        action: "panel_member.create",
        entityType: "PanelMember",
        entityId: member.id,
        after: member,
      });
      return member;
    });
  } catch (error) {
    await deletePanelImage(image?.path ?? null);
    throw error;
  }

  revalidatePanel(created.semester);
  redirect(`/admin/panel?semester=${created.semester}`);
}

export async function updatePanelMember(
  id: string,
  _prev: PanelFormState,
  formData: FormData,
): Promise<PanelFormState> {
  const admin = await requireAdmin();

  const values = readPanelForm(formData);
  const parsed = panelMemberSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const before = await prisma.panelMember.findUnique({ where: { id } });
  if (!before) return { formError: "That member no longer exists.", values };

  // Upload first, write second, delete the old object last: a failure at any
  // step leaves the member with a photo that still resolves.
  let image: { path: string | null; publicUrl: string | null } = {
    path: before.imagePath,
    publicUrl: before.imageUrl,
  };
  let uploadedPath: string | null = null;

  const photo = selectedPhoto(formData);
  const removing = formData.get("removePhoto") === "on";

  if (photo) {
    const upload = await uploadPanelImage({
      file: photo,
      semester: parsed.data.semester,
      memberId: id,
    });
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
      const member = await tx.panelMember.update({
        where: { id },
        data: {
          ...parsed.data,
          imageUrl: image.publicUrl,
          imagePath: image.path,
        },
      });
      await writeAuditLog(tx, {
        actor: admin,
        action: "panel_member.update",
        entityType: "PanelMember",
        entityId: id,
        before,
        after: member,
      });
      return member;
    });
  } catch (error) {
    await deletePanelImage(uploadedPath);
    throw error;
  }

  if (before.imagePath && before.imagePath !== image.path) {
    await deletePanelImage(before.imagePath);
  }

  revalidatePanel(before.semester, after.semester);
  redirect(`/admin/panel?semester=${after.semester}`);
}

export async function deletePanelMember(id: string): Promise<void> {
  const admin = await requireAdmin();

  const before = await prisma.panelMember.findUnique({ where: { id } });
  if (!before) return;

  await prisma.$transaction(async (tx) => {
    await tx.panelMember.delete({ where: { id } });
    await writeAuditLog(tx, {
      actor: admin,
      action: "panel_member.delete",
      entityType: "PanelMember",
      entityId: id,
      before,
    });
  });

  // After the row is gone: a failure here leaves an unreferenced object, not a
  // member whose photo has vanished.
  await deletePanelImage(before.imagePath);

  revalidatePanel(before.semester);
}
