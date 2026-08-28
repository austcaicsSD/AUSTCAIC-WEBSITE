"use client";

import { useActionState } from "react";
import { Field, Input, Textarea } from "@/app/admin/_components/Field";
import { LinkButton } from "@/app/admin/_components/Button";
import { SubmitButton } from "@/app/admin/_components/SubmitButton";
import { Card } from "@/app/admin/_components/Card";
import { PhotoField } from "./PhotoField";
import type { GalleryField, GalleryFormState } from "@/lib/validation/gallery";

export type GalleryMomentFormValues = {
  title: string;
  description: string | null;
  momentDate: string;
  orderIndex: number;
  imageUrl: string | null;
};

const EMPTY: GalleryMomentFormValues = {
  title: "",
  description: null,
  momentDate: "",
  orderIndex: 0,
  imageUrl: null,
};

export function GalleryMomentForm({
  action,
  initial = EMPTY,
  submitLabel,
}: {
  action: (
    state: GalleryFormState,
    formData: FormData,
  ) => Promise<GalleryFormState>;
  initial?: GalleryMomentFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, {} as GalleryFormState);
  const err = (field: GalleryField | "photo") => state.fieldErrors?.[field]?.[0];
  // React resets the form once the action resolves, so a rejected submit has to
  // be repopulated from what the server echoed back.
  const val = (field: GalleryField) =>
    state.values?.[field] ?? String(initial[field] ?? "");

  return (
    <form action={formAction} className="space-y-6">
      {state.formError && (
        <p
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-bold text-red-600"
        >
          {state.formError}
        </p>
      )}

      <Card className="p-6 sm:p-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Field label="Title" htmlFor="title" required error={err("title")}>
            <Input
              id="title"
              name="title"
              defaultValue={val("title")}
              aria-invalid={Boolean(err("title"))}
              aria-describedby={err("title") ? "title-error" : undefined}
            />
          </Field>

          <Field label="Date" htmlFor="momentDate" required error={err("momentDate")}>
            <Input
              id="momentDate"
              name="momentDate"
              type="date"
              defaultValue={val("momentDate")}
              aria-invalid={Boolean(err("momentDate"))}
              aria-describedby={err("momentDate") ? "momentDate-error" : undefined}
            />
          </Field>

          <Field
            label="Display order"
            htmlFor="orderIndex"
            hint="Lower numbers appear first"
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
        </div>

        <div className="mt-5">
          <Field
            label="Description"
            htmlFor="description"
            error={err("description")}
          >
            <Textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={val("description")}
              aria-invalid={Boolean(err("description"))}
            />
          </Field>
        </div>

        <PhotoField currentUrl={initial.imageUrl} error={err("photo")} />
      </Card>

      <div className="flex justify-end gap-3">
        <LinkButton href="/admin/gallery" variant="secondary">
          Cancel
        </LinkButton>
        <SubmitButton pendingLabel="Saving…">{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
