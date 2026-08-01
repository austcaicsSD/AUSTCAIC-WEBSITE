"use server";

import { Prisma, PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function registerMember(formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string;
    const studentId = formData.get("studentId") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const department = formData.get("department") as string;
    const semester = formData.get("semester") as string;

    await prisma.member.create({
      data: {
        fullName,
        studentId,
        email,
        phone,
        department,
        semester,
      },
    });

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
    const email = formData.get("email") as string;
    const studentId = formData.get("studentId") as string;
    const memberId = formData.get("memberId") as string;

    if (!email || !studentId || !memberId) {
      return { success: false, message: "All fields are required." };
    }

    const member = await prisma.member.findFirst({
      where: {
        email,
        studentId,
        memberId,
      },
    });

    if (member) {
      // Store authenticated member state via HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set("austcaic_session", member.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
      });

      return { success: true, message: "Login successful!" };
    } else {
      return { success: false, message: "Invalid Email, Student ID or Member ID." };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}
