import { z } from "zod";

const trimmed = (v: unknown) => (typeof v === "string" ? v.trim() : v);

const blankToNull = (v: unknown) => {
  const t = trimmed(v);
  return t === "" || t === undefined ? null : t;
};

export const SPONSOR_TYPES = [
  "GOLD_PARTNER",
  "SILVER_PARTNER",
  "ACADEMIC_PARTNER",
  "MEDIA_SPONSOR",
] as const;

export type SponsorTypeValue = (typeof SPONSOR_TYPES)[number];

export const SPONSOR_TYPE_LABELS: Record<SponsorTypeValue, string> = {
  GOLD_PARTNER: "Gold Partner",
  SILVER_PARTNER: "Silver Partner",
  ACADEMIC_PARTNER: "Academic Partner",
  MEDIA_SPONSOR: "Media Sponsor",
};

export const sponsorSchema = z.object({
  name: z.preprocess(
    trimmed,
    z.string().min(2, "Name is required").max(160, "Name is too long"),
  ),
  type: z.enum(SPONSOR_TYPES, { message: "Pick a sponsor type" }),
  websiteUrl: z.preprocess(
    blankToNull,
    z
      .string()
      .max(2048, "Website URL is too long")
      .refine(
        (v) => /^https?:\/\/.+/i.test(v),
        "Enter a full URL starting with http:// or https://",
      )
      .nullable(),
  ),
  orderIndex: z.coerce
    .number()
    .int("Order must be a whole number")
    .min(0, "Order cannot be negative")
    .max(9999),
});

export type SponsorInput = z.infer<typeof sponsorSchema>;

export const SPONSOR_FIELDS = ["name", "type", "websiteUrl", "orderIndex"] as const;

export type SponsorField = (typeof SPONSOR_FIELDS)[number];

export type SponsorFormValues = Partial<Record<SponsorField, string>>;

export type SponsorFormState = {
  formError?: string;
  fieldErrors?: Partial<Record<SponsorField | "photo", string[]>>;
  /** React resets the form after an action, so failures must repopulate it. */
  values?: SponsorFormValues;
};

export function readSponsorForm(formData: FormData): SponsorFormValues {
  return Object.fromEntries(
    SPONSOR_FIELDS.map((field) => {
      const value = formData.get(field);
      return [field, typeof value === "string" ? value : ""];
    }),
  );
}
