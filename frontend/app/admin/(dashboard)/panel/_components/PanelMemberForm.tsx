"use client";

import Image from "next/image";
import { useActionState } from "react";
import { Field, Input } from "@/app/admin/_components/Field";
import { LinkButton } from "@/app/admin/_components/Button";
import { SubmitButton } from "@/app/admin/_components/SubmitButton";
import { Card } from "@/app/admin/_components/Card";
import type { PanelField, PanelFormState } from "@/lib/validation/panel";

export type PanelMemberFormValues = {
  name: string;
  role: string;
  semester: string;
  wing: string | null;
  memberId: string | null;
  personalEmail: string | null;
  facebookUrl: string | null;
  linkedinUrl: string | null;
  orderIndex: number;
  imageUrl: string | null;
};

const EMPTY: PanelMemberFormValues = {
  name: "",
  role: "",
  semester: "",
  wing: null,
  memberId: null,
  personalEmail: null,
  facebookUrl: null,
  linkedinUrl: null,
  orderIndex: 0,
  imageUrl: null,
};

export function PanelMemberForm({
  action,
  initial = EMPTY,
  semesters,
  roles,
  wings,
  submitLabel,
}: {
  action: (
    state: PanelFormState,
    formData: FormData,
  ) => Promise<PanelFormState>;
  initial?: PanelMemberFormValues;
  semesters: string[];
  roles: string[];
  wings: string[];
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, {} as PanelFormState);
  const err = (field: PanelField) => state.fieldErrors?.[field]?.[0];
  // React resets the form once the action resolves, so a rejected submit has to
  // be repopulated from what the server echoed back.
  const val = (field: PanelField) =>
    state.values?.[field] ?? String(initial[field] ?? "");

  return (
    <form action={formAction} className="space-y-6">
      {state.formError && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
        >
          {state.formError}
        </p>
      )}

      <Card className="p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Full name" htmlFor="name" required error={err("name")}>
            <Input
              id="name"
              name="name"
              defaultValue={val("name")}
              aria-invalid={Boolean(err("name"))}
              aria-describedby={err("name") ? "name-error" : undefined}
            />
          </Field>

          <Field label="Role" htmlFor="role" required error={err("role")}>
            <Input
              id="role"
              name="role"
              list="role-options"
              defaultValue={val("role")}
              aria-invalid={Boolean(err("role"))}
              aria-describedby={err("role") ? "role-error" : undefined}
            />
          </Field>

          <Field
            label="Semester"
            htmlFor="semester"
            required
            hint="Lowercase slug, e.g. fall-2025"
            error={err("semester")}
          >
            <Input
              id="semester"
              name="semester"
              list="semester-options"
              placeholder="fall-2025"
              defaultValue={val("semester")}
              aria-invalid={Boolean(err("semester"))}
              aria-describedby={err("semester") ? "semester-error" : undefined}
            />
          </Field>

          <Field
            label="Wing"
            htmlFor="wing"
            hint="Pick an existing wing to keep names consistent"
            error={err("wing")}
          >
            <Input
              id="wing"
              name="wing"
              list="wing-options"
              defaultValue={val("wing")}
              aria-invalid={Boolean(err("wing"))}
            />
          </Field>

          <Field label="Student ID" htmlFor="memberId" error={err("memberId")}>
            <Input
              id="memberId"
              name="memberId"
              defaultValue={val("memberId")}
              aria-invalid={Boolean(err("memberId"))}
            />
          </Field>

          <Field
            label="Display order"
            htmlFor="orderIndex"
            hint="Lower numbers appear first within a role group"
            error={err("orderIndex")}
          >
            <Input
              id="orderIndex"
              name="orderIndex"
              type="number"
              min={0}
              defaultValue={val("orderIndex")}
              aria-invalid={Boolean(err("orderIndex"))}
            />
          </Field>

          <Field
            label="Personal email"
            htmlFor="personalEmail"
            error={err("personalEmail")}
          >
            <Input
              id="personalEmail"
              name="personalEmail"
              type="email"
              defaultValue={val("personalEmail")}
              aria-invalid={Boolean(err("personalEmail"))}
            />
          </Field>

          <Field
            label="Facebook URL"
            htmlFor="facebookUrl"
            error={err("facebookUrl")}
          >
            <Input
              id="facebookUrl"
              name="facebookUrl"
              type="url"
              defaultValue={val("facebookUrl")}
              aria-invalid={Boolean(err("facebookUrl"))}
            />
          </Field>

          <Field
            label="LinkedIn URL"
            htmlFor="linkedinUrl"
            error={err("linkedinUrl")}
          >
            <Input
              id="linkedinUrl"
              name="linkedinUrl"
              type="url"
              defaultValue={val("linkedinUrl")}
              aria-invalid={Boolean(err("linkedinUrl"))}
            />
          </Field>
        </div>

        <div className="mt-6 flex items-center gap-4 border-t border-gray-200 pt-6">
          {initial.imageUrl ? (
            <Image
              src={initial.imageUrl}
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-400">
              None
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-gray-900">Photo</p>
            <p className="text-sm text-gray-500">
              Uploading is not wired up yet - it arrives in the next milestone.
            </p>
          </div>
        </div>
      </Card>

      <datalist id="semester-options">
        {semesters.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>
      <datalist id="role-options">
        {roles.map((r) => (
          <option key={r} value={r} />
        ))}
      </datalist>
      <datalist id="wing-options">
        {wings.map((w) => (
          <option key={w} value={w} />
        ))}
      </datalist>

      <div className="flex justify-end gap-3">
        <LinkButton href="/admin/panel" variant="secondary">
          Cancel
        </LinkButton>
        <SubmitButton pendingLabel="Saving…">{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
