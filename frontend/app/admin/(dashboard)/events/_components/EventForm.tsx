"use client";

import { useActionState } from "react";
import { Field, Input, Select, Textarea } from "@/app/admin/_components/Field";
import { LinkButton } from "@/app/admin/_components/Button";
import { SubmitButton } from "@/app/admin/_components/SubmitButton";
import { Card } from "@/app/admin/_components/Card";
import { PhotoField } from "@/app/admin/(dashboard)/panel/_components/PhotoField";
import {
  EVENT_CATEGORIES,
  EVENT_CATEGORY_LABELS,
  type EventField,
  type EventFormState,
} from "@/lib/validation/events";

export type EventFormValues = {
  title: string;
  category: string;
  description: string;
  /** datetime-local input values, already in Dhaka time. */
  startsAt: string;
  endsAt: string;
  venue: string | null;
  speaker: string | null;
  speakerRole: string | null;
  registrationUrl: string | null;
  registrationClosed: boolean;
  orderIndex: number;
  imageUrl: string | null;
};

const EMPTY: EventFormValues = {
  title: "",
  category: "",
  description: "",
  startsAt: "",
  endsAt: "",
  venue: null,
  speaker: null,
  speakerRole: null,
  registrationUrl: null,
  registrationClosed: false,
  orderIndex: 0,
  imageUrl: null,
};

export function EventForm({
  action,
  initial = EMPTY,
  submitLabel,
}: {
  action: (state: EventFormState, formData: FormData) => Promise<EventFormState>;
  initial?: EventFormValues;
  submitLabel: string;
}) {
  const [state, formAction] = useActionState(action, {} as EventFormState);
  const err = (field: EventField | "photo") => state.fieldErrors?.[field]?.[0];
  // React resets the form once the action resolves, so a rejected submit has to
  // be repopulated from what the server echoed back.
  const val = (field: Exclude<EventField, "registrationClosed">) =>
    state.values?.[field] ?? String(initial[field] ?? "");
  const closedDefault =
    state.values?.registrationClosed !== undefined
      ? state.values.registrationClosed === "on"
      : initial.registrationClosed;

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
          <div className="md:col-span-2">
            <Field label="Title" htmlFor="title" required error={err("title")}>
              <Input
                id="title"
                name="title"
                defaultValue={val("title")}
                aria-invalid={Boolean(err("title"))}
                aria-describedby={err("title") ? "title-error" : undefined}
              />
            </Field>
          </div>

          <Field label="Category" htmlFor="category" required error={err("category")}>
            <Select
              id="category"
              name="category"
              defaultValue={val("category")}
              aria-invalid={Boolean(err("category"))}
              aria-describedby={err("category") ? "category-error" : undefined}
            >
              <option value="" disabled>
                Select a category
              </option>
              {EVENT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {EVENT_CATEGORY_LABELS[c]}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label="Display order"
            htmlFor="orderIndex"
            hint="Lower numbers appear first among events on the same day"
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
            label="Starts"
            htmlFor="startsAt"
            required
            hint="Dhaka time. Future dates show under Upcoming Events; past dates under Recent Club Actions."
            error={err("startsAt")}
          >
            <Input
              id="startsAt"
              name="startsAt"
              type="datetime-local"
              defaultValue={val("startsAt")}
              aria-invalid={Boolean(err("startsAt"))}
              aria-describedby={err("startsAt") ? "startsAt-error" : undefined}
            />
          </Field>

          <Field label="Ends" htmlFor="endsAt" hint="Optional" error={err("endsAt")}>
            <Input
              id="endsAt"
              name="endsAt"
              type="datetime-local"
              defaultValue={val("endsAt")}
              aria-invalid={Boolean(err("endsAt"))}
              aria-describedby={err("endsAt") ? "endsAt-error" : undefined}
            />
          </Field>

          <div className="md:col-span-2">
            <Field
              label="Description"
              htmlFor="description"
              required
              error={err("description")}
            >
              <Textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={val("description")}
                aria-invalid={Boolean(err("description"))}
                aria-describedby={err("description") ? "description-error" : undefined}
              />
            </Field>
          </div>

          <Field label="Venue" htmlFor="venue" error={err("venue")}>
            <Input
              id="venue"
              name="venue"
              placeholder="AUST Seminar Hall (Room 4A02)"
              defaultValue={val("venue")}
              aria-invalid={Boolean(err("venue"))}
            />
          </Field>

          <Field
            label="Registration URL"
            htmlFor="registrationUrl"
            hint="Include https://. Leave blank if there is no sign-up."
            error={err("registrationUrl")}
          >
            <Input
              id="registrationUrl"
              name="registrationUrl"
              type="url"
              placeholder="https://forms.gle/..."
              defaultValue={val("registrationUrl")}
              aria-invalid={Boolean(err("registrationUrl"))}
              aria-describedby={
                err("registrationUrl") ? "registrationUrl-error" : undefined
              }
            />
          </Field>

          <Field label="Speaker" htmlFor="speaker" error={err("speaker")}>
            <Input
              id="speaker"
              name="speaker"
              defaultValue={val("speaker")}
              aria-invalid={Boolean(err("speaker"))}
            />
          </Field>

          <Field label="Speaker role" htmlFor="speakerRole" error={err("speakerRole")}>
            <Input
              id="speakerRole"
              name="speakerRole"
              placeholder="Lead Security Analyst & AUST Alumnus"
              defaultValue={val("speakerRole")}
              aria-invalid={Boolean(err("speakerRole"))}
            />
          </Field>

          <div className="md:col-span-2">
            <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white/60 p-4">
              <input
                type="checkbox"
                name="registrationClosed"
                defaultChecked={closedDefault}
                className="mt-0.5 h-4 w-4 rounded border-gray-300"
              />
              <span>
                <span className="block text-sm font-bold text-gray-900">
                  Registration closed
                </span>
                <span className="block text-xs font-medium text-gray-500">
                  Tick when seats are full. Otherwise registration closes on its
                  own once the event has started.
                </span>
              </span>
            </label>
          </div>
        </div>

        <PhotoField currentUrl={initial.imageUrl} error={err("photo")} />
      </Card>

      <div className="flex justify-end gap-3">
        <LinkButton href="/admin/events" variant="secondary">
          Cancel
        </LinkButton>
        <SubmitButton pendingLabel="Saving…">{submitLabel}</SubmitButton>
      </div>
    </form>
  );
}
