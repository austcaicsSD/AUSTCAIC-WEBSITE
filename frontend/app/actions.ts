"use server";

import { PrismaClient } from "@prisma/client";

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
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
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
