import { z } from "zod";

const trimmed = (v: unknown) => (typeof v === "string" ? v.trim() : v);

const blankToNull = (v: unknown) => {
  const t = trimmed(v);
  return t === "" || t === undefined ? null : t;
};

/** Slug form used by the public route /panel/[semester], e.g. "fall-2025". */
export const SEMESTER_PATTERN = /^[a-z]+-\d{4}$/;

export const panelMemberSchema = z.object({
  name: z.preprocess(
    trimmed,
    z.string().min(2, "Name is required").max(120, "Name is too long"),
  ),
  role: z.preprocess(
    trimmed,
    z.string().min(2, "Role is required").max(120, "Role is too long"),
  ),
  semester: z.preprocess(
    trimmed,
    z
      .string()
      .regex(SEMESTER_PATTERN, "Use a slug like fall-2025 (lowercase, hyphen)"),
  ),
  wing: z.preprocess(blankToNull, z.string().max(120).nullable()),
  memberId: z.preprocess(blankToNull, z.string().max(60).nullable()),
  personalEmail: z.preprocess(
    blankToNull,
    z.email("Enter a valid email address").nullable(),
  ),
  facebookUrl: z.preprocess(
    blankToNull,
    z.url("Enter a full URL including https://").nullable(),
  ),
  linkedinUrl: z.preprocess(
    blankToNull,
    z.url("Enter a full URL including https://").nullable(),
  ),
  orderIndex: z.coerce
    .number()
    .int("Order must be a whole number")
    .min(0, "Order cannot be negative")
    .max(9999),
});

export type PanelMemberInput = z.infer<typeof panelMemberSchema>;

export const PANEL_FIELDS = [
  "name",
  "role",
  "semester",
  "wing",
  "memberId",
  "personalEmail",
  "facebookUrl",
  "linkedinUrl",
  "orderIndex",
] as const;

export type PanelField = (typeof PANEL_FIELDS)[number];

export type PanelFormValues = Partial<Record<PanelField, string>>;

export type PanelFormState = {
  formError?: string;
  fieldErrors?: Partial<Record<PanelField | "photo", string[]>>;
  /** React resets the form after an action, so failures must repopulate it. */
  values?: PanelFormValues;
};

export function readPanelForm(formData: FormData): PanelFormValues {
  return Object.fromEntries(
    PANEL_FIELDS.map((field) => {
      const value = formData.get(field);
      return [field, typeof value === "string" ? value : ""];
    }),
  );
}
