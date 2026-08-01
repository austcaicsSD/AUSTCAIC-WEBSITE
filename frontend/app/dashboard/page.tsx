import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

import ClientBackground from "./ClientBackground";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("austcaic_session")?.value;

  if (!sessionId) {
    redirect("/login");
  }

  const member = await prisma.member.findUnique({
    where: { id: sessionId },
  });

  if (!member) {
    redirect("/login");
  }

  return (
    <main className="relative min-h-screen w-full bg-[#fafafa] text-gray-900 font-sans flex flex-col p-6 sm:p-12 overflow-hidden">
      <ClientBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-black tracking-tight text-gray-950">
            AUST<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">CAIC</span> Dashboard
          </h1>
          <form action={async () => {
            "use server";
            const cookieStore = await cookies();
            cookieStore.delete("austcaic_session");
            redirect("/login");
          }}>
            <button type="submit" className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors">
              Log Out
            </button>
          </form>
        </header>

        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome back, {member.fullName}!</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Student ID</p>
              <p className="text-lg font-medium text-gray-900">{member.studentId}</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Member ID</p>
              <p className="text-lg font-medium text-gray-900">{member.memberId}</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email</p>
              <p className="text-lg font-medium text-gray-900">{member.email}</p>
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Department & Semester</p>
              <p className="text-lg font-medium text-gray-900">{member.department} - {member.semester}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
