"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/require-admin";
import { writeAuditLog } from "@/lib/audit";
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

  const created = await prisma.$transaction(async (tx) => {
    const member = await tx.panelMember.create({ data: parsed.data });
    await writeAuditLog(tx, {
      actor: admin,
      action: "panel_member.create",
      entityType: "PanelMember",
      entityId: member.id,
      after: member,
    });
    return member;
  });

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

  const after = await prisma.$transaction(async (tx) => {
    const member = await tx.panelMember.update({
      where: { id },
      data: parsed.data,
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

  revalidatePanel(before.semester);
}
