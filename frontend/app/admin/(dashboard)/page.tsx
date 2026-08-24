import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [total, withPhoto, semesters] = await Promise.all([
    prisma.panelMember.count(),
    prisma.panelMember.count({ where: { imageUrl: { not: null } } }),
    prisma.panelMember.findMany({
      distinct: ["semester"],
      select: { semester: true },
    }),
  ]);

  const stats = [
    { label: "Panel members", value: total },
    { label: "Missing a photo", value: total - withPhoto },
    { label: "Semesters", value: semesters.length },
  ];

  return (
    <>
      <h1 className="mb-8 text-2xl font-black tracking-tight text-gray-950">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-gray-200 bg-white p-6"
          >
            <p className="text-xs font-black uppercase tracking-widest text-gray-500">
              {s.label}
            </p>
            <p className="mt-2 text-4xl font-black text-gray-950">{s.value}</p>
          </div>
        ))}
      </div>
    </>
  );
}
