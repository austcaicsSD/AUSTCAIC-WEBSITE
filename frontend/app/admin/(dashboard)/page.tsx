import { prisma } from "@/lib/prisma";
import { semesterLabel } from "@/lib/semester";
import { PageHeader } from "../_components/PageHeader";
import { Card, CardHeader } from "../_components/Card";
import { Table, Th, Td } from "../_components/Table";
import { EmptyState } from "../_components/EmptyState";

// Club is Dhaka-based; pinning the zone keeps timestamps stable regardless of
// where the server runs.
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Dhaka",
});

export default async function AdminDashboardPage() {
  const [total, withPhoto, bySemester, missingBySemester, recent] =
    await Promise.all([
      prisma.panelMember.count(),
      prisma.panelMember.count({ where: { imageUrl: { not: null } } }),
      prisma.panelMember.groupBy({
        by: ["semester"],
        _count: { _all: true },
        orderBy: { semester: "desc" },
      }),
      prisma.panelMember.groupBy({
        by: ["semester"],
        where: { imageUrl: null },
        _count: { _all: true },
      }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
    ]);

  const missingFor = new Map(
    missingBySemester.map((r) => [r.semester, r._count._all]),
  );

  const stats = [
    { label: "Panel members", value: total },
    { label: "Missing a photo", value: total - withPhoto },
    { label: "Semesters", value: bySemester.length },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of the executive committee roster."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-500">
              {s.label}
            </p>
            <p className="mt-2 text-4xl font-black text-gray-950">{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader title="Members by semester" />
        {bySemester.length === 0 ? (
          <EmptyState
            title="No panel members yet"
            description="Once members are added they will be grouped by semester here."
          />
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Semester</Th>
                <Th className="text-right">Members</Th>
                <Th className="text-right">Missing a photo</Th>
              </tr>
            </thead>
            <tbody>
              {bySemester.map((row) => {
                const missing = missingFor.get(row.semester) ?? 0;
                return (
                  <tr key={row.semester}>
                    <Td className="font-bold text-gray-950">
                      {semesterLabel(row.semester)}
                    </Td>
                    <Td className="text-right tabular-nums">
                      {row._count._all}
                    </Td>
                    <Td
                      className={
                        missing > 0
                          ? "text-right font-bold tabular-nums text-amber-700"
                          : "text-right tabular-nums text-gray-400"
                      }
                    >
                      {missing}
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card>

      <Card className="mt-6">
        <CardHeader title="Recent activity" />
        {recent.length === 0 ? (
          <EmptyState
            title="Nothing recorded yet"
            description="Every change made from this panel is logged here with who made it and when."
          />
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>When</Th>
                <Th>Who</Th>
                <Th>Action</Th>
                <Th>Record</Th>
              </tr>
            </thead>
            <tbody>
              {recent.map((entry) => (
                <tr key={entry.id}>
                  <Td className="whitespace-nowrap text-gray-500">
                    {dateFormat.format(entry.createdAt)}
                  </Td>
                  <Td className="whitespace-nowrap">{entry.actorEmail}</Td>
                  <Td className="font-bold text-gray-950">{entry.action}</Td>
                  <Td className="text-gray-500">{entry.entityType}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </>
  );
}
