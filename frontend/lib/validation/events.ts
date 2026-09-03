import { z } from "zod";

const trimmed = (v: unknown) => (typeof v === "string" ? v.trim() : v);

const blankToNull = (v: unknown) => {
  const t = trimmed(v);
  return t === "" || t === undefined ? null : t;
};

export const EVENT_CATEGORIES = [
  "WORKSHOP",
  "SEMINAR",
  "WEBINAR",
  "HACKATHON",
  "COMPETITION",
] as const;

export type EventCategoryValue = (typeof EVENT_CATEGORIES)[number];

export const EVENT_CATEGORY_LABELS: Record<EventCategoryValue, string> = {
  WORKSHOP: "Workshop",
  SEMINAR: "Seminar",
  WEBINAR: "Webinar",
  HACKATHON: "Hackathon",
  COMPETITION: "Competition",
};

// <input type="datetime-local"> submits "YYYY-MM-DDTHH:mm" with no zone. It is
// read as Dhaka wall-clock time so an event entered as 3 PM is 3 PM for the
// members regardless of where the server happens to run.
const DHAKA_OFFSET = "+06:00";

const localDateTime = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, "Pick a date and time")
  .transform((v) => new Date(`${v}:00${DHAKA_OFFSET}`))
  .refine((d) => !Number.isNaN(d.getTime()), "That date is not valid");

const optionalUrl = z.preprocess(
  blankToNull,
  z
    .string()
    .max(2048, "URL is too long")
    .refine(
      (v) => /^https?:\/\/.+/i.test(v),
      "Enter a full URL starting with http:// or https://",
    )
    .nullable(),
);

export const eventSchema = z
  .object({
    title: z.preprocess(
      trimmed,
      z.string().min(3, "Title is required").max(160, "Title is too long"),
    ),
    category: z.enum(EVENT_CATEGORIES, { message: "Pick a category" }),
    description: z.preprocess(
      trimmed,
      z
        .string()
        .min(10, "Add a short description")
        .max(2000, "Description is too long"),
    ),
    startsAt: localDateTime,
    endsAt: z.preprocess(blankToNull, localDateTime.nullable()),
    venue: z.preprocess(blankToNull, z.string().max(160).nullable()),
    speaker: z.preprocess(blankToNull, z.string().max(120).nullable()),
    speakerRole: z.preprocess(blankToNull, z.string().max(160).nullable()),
    registrationUrl: optionalUrl,
    registrationClosed: z.preprocess((v) => v === "on", z.boolean()),
    orderIndex: z.coerce
      .number()
      .int("Order must be a whole number")
      .min(0, "Order cannot be negative")
      .max(9999),
  })
  .refine((e) => !e.endsAt || e.endsAt > e.startsAt, {
    message: "End time must be after the start time",
    path: ["endsAt"],
  });

export type EventInput = z.infer<typeof eventSchema>;

export const EVENT_FIELDS = [
  "title",
  "category",
  "description",
  "startsAt",
  "endsAt",
  "venue",
  "speaker",
  "speakerRole",
  "registrationUrl",
  "registrationClosed",
  "orderIndex",
] as const;

export type EventField = (typeof EVENT_FIELDS)[number];

export type EventFormValues = Partial<Record<EventField, string>>;

export type EventFormState = {
  formError?: string;
  fieldErrors?: Partial<Record<EventField | "photo", string[]>>;
  /** React resets the form after an action, so failures must repopulate it. */
  values?: EventFormValues;
};

export function readEventForm(formData: FormData): EventFormValues {
  return Object.fromEntries(
    EVENT_FIELDS.map((field) => {
      const value = formData.get(field);
      return [field, typeof value === "string" ? value : ""];
    }),
  );
}

/** Formats a stored instant back into the datetime-local input value, in Dhaka time. */
export function toLocalInputValue(date: Date | null | undefined): string {
  if (!date) return "";
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Dhaka",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}
