import { z } from "zod";

const trimmed = (v: unknown) => (typeof v === "string" ? v.trim() : v);

const blankToNull = (v: unknown) => {
  const t = trimmed(v);
  return t === "" || t === undefined ? null : t;
};

export const galleryMomentSchema = z.object({
  title: z.preprocess(
    trimmed,
    z.string().min(2, "Title is required").max(160, "Title is too long"),
  ),
  description: z.preprocess(
    blankToNull,
    z.string().max(2000, "Description is too long").nullable(),
  ),
  momentDate: z.preprocess(
    trimmed,
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date")
      .refine((v) => !Number.isNaN(Date.parse(v)), "Enter a valid date"),
  ),
  orderIndex: z.coerce
    .number()
    .int("Order must be a whole number")
    .min(0, "Order cannot be negative")
    .max(9999),
});

export type GalleryMomentInput = z.infer<typeof galleryMomentSchema>;

export const GALLERY_FIELDS = [
  "title",
  "description",
  "momentDate",
  "orderIndex",
] as const;

export type GalleryField = (typeof GALLERY_FIELDS)[number];

export type GalleryFormValues = Partial<Record<GalleryField, string>>;

export type GalleryFormState = {
  formError?: string;
  fieldErrors?: Partial<Record<GalleryField | "photo", string[]>>;
  /** React resets the form after an action, so failures must repopulate it. */
  values?: GalleryFormValues;
};

export function readGalleryForm(formData: FormData): GalleryFormValues {
  return Object.fromEntries(
    GALLERY_FIELDS.map((field) => {
      const value = formData.get(field);
      return [field, typeof value === "string" ? value : ""];
    }),
  );
}
