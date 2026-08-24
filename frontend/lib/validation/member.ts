import { z } from "zod";

const trimmed = (v: unknown) => (typeof v === "string" ? v.trim() : v);

export const memberRegistrationSchema = z.object({
  fullName: z.preprocess(
    trimmed,
    z.string().min(2, "Please enter your full name.").max(120),
  ),
  studentId: z.preprocess(
    trimmed,
    z
      .string()
      .regex(/^\d{9,15}$/, "Student ID should be 9 to 15 digits."),
  ),
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
    z.email("Enter a valid email address.").max(160),
  ),
  phone: z.preprocess(
    trimmed,
    z
      .string()
      .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number."),
  ),
  department: z.preprocess(trimmed, z.string().min(2).max(80)),
  semester: z.preprocess(trimmed, z.string().min(1).max(40)),
});

export const memberLoginSchema = z.object({
  email: z.preprocess(
    (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
    z.email().max(160),
  ),
  studentId: z.preprocess(trimmed, z.string().min(1).max(40)),
  memberId: z.preprocess(trimmed, z.string().min(1).max(60)),
});
