"use server";

import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashedIp, isRateLimited, recordAttempt } from "@/lib/rate-limit";
import {
  memberLoginSchema,
  memberRegistrationSchema,
} from "@/lib/validation/member";

const TOO_MANY = "Too many attempts. Please try again in a little while.";

export async function registerMember(formData: FormData) {
  try {
    const parsed = memberRegistrationSchema.safeParse({
      fullName: formData.get("fullName"),
      studentId: formData.get("studentId"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      department: formData.get("department"),
      semester: formData.get("semester"),
    });

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? "Please check your details.",
      };
    }

    // Unauthenticated write, so it is capped per address rather than per field.
    const ipKey = `register-ip:${await hashedIp()}`;
    if (await isRateLimited(ipKey, 5, 60, { countSuccessful: true })) {
      return { success: false, message: TOO_MANY };
    }
    await recordAttempt(ipKey, true);

    await prisma.member.create({ data: parsed.data });

    return { success: true, message: "Registration Successful!" };
  } catch (error: unknown) {
    console.error(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message: "This Student ID or Email is already registered.",
      };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function loginMember(prevState: unknown, formData: FormData) {
  try {
    const parsed = memberLoginSchema.safeParse({
      email: formData.get("email"),
      studentId: formData.get("studentId"),
      memberId: formData.get("memberId"),
    });

    if (!parsed.success) {
      return { success: false, message: "All fields are required." };
    }

    const { email, studentId, memberId } = parsed.data;

    // Member IDs run in a short sequential range, so without a cap the whole
    // roster could be walked from a single address.
    const emailKey = `member:${email}`;
    const ipKey = `member-ip:${await hashedIp()}`;

    if (
      (await isRateLimited(emailKey, 8, 15)) ||
      (await isRateLimited(ipKey, 25, 15))
    ) {
      return { success: false, message: TOO_MANY };
    }

    const member = await prisma.member.findFirst({
      where: {
        email: { equals: email, mode: "insensitive" },
        studentId,
        memberId: { equals: memberId, mode: "insensitive" },
      },
    });

    if (!member) {
      await recordAttempt(emailKey, false);
      await recordAttempt(ipKey, false);
      return {
        success: false,
        message: "Invalid Email, Student ID or Member ID.",
      };
    }

    await recordAttempt(emailKey, true);

    const cookieStore = await cookies();
    cookieStore.set("austcaic_session", member.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return { success: true, message: "Login successful!" };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
