"use client";

import { useActionState } from "react";
import { Field, Input, Select } from "@/app/admin/_components/Field";
import { LinkButton } from "@/app/admin/_components/Button";
import { SubmitButton } from "@/app/admin/_components/SubmitButton";
import { Card } from "@/app/admin/_components/Card";
import { LogoField } from "./LogoField";
import {
  SPONSOR_TYPES,
  SPONSOR_TYPE_LABELS,
  type SponsorField,
  type SponsorFormState,
} from "@/lib/validation/sponsors";

export type SponsorFormValues = {
  name: string;
  type: string;
  websiteUrl: string | null;
  orderIndex: number;
  imageUrl: string | null;
};

const EMPTY: SponsorFormValues = {
  name: "",
  type: "",
  websiteUrl: null,
  orderIndex: 0,
  imageUrl: null,
};

export function SponsorForm({
  action,
  initial = EMPTY,
  submitLabel,
}: {
  action: (
    state: SponsorFormState,
    formData: FormData,
  ) => Promise<SponsorFormState>;
  initial?: SponsorFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, {} as SponsorFormState);
  const err = (field: SponsorField | "photo") => state.fieldErrors?.[field]?.[0];
  // React resets the form once the action resolves, so a rejected submit has to
  // be repopulated from what the server echoed back.
  const val = (field: SponsorField) =>
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
          <Field label="Name" htmlFor="name" required error={err("name")}>
            <Input
              id="name"
              name="name"
              defaultValue={val("name")}
              aria-invalid={Boolean(err("name"))}
              aria-describedby={err("name") ? "name-error" : undefined}
            />
          </Field>

          <Field label="Sponsor type" htmlFor="type" required error={err("type")}>
            <Select
              id="type"
              name="type"
              defaultValue={val("type")}
              aria-invalid={Boolean(err("type"))}
              aria-describedby={err("type") ? "type-error" : undefined}
            >
              <option value="" disabled>
                Select a type
              </option>
              {SPONSOR_TYPES.map((t) => (
                <option key={t} value={t}>
                  {SPONSOR_TYPE_LABELS[t]}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label="Website URL"
            htmlFor="websiteUrl"
            hint="Include https://"
            error={err("websiteUrl")}
          >
            <Input
              id="websiteUrl"
              name="websiteUrl"
              type="url"
              placeholder="https://example.com"
              defaultValue={val("websiteUrl")}
              aria-invalid={Boolean(err("websiteUrl"))}
              aria-describedby={err("websiteUrl") ? "websiteUrl-error" : undefined}
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

        <LogoField currentUrl={initial.imageUrl} error={err("photo")} />
      </Card>

      <div className="flex justify-end gap-3">
        <LinkButton href="/admin/sponsors" variant="secondary">
          Cancel
        </LinkButton>
        <SubmitButton pendingLabel="Saving…">{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
