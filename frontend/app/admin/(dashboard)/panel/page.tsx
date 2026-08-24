import Image from "next/image";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { semesterLabel } from "@/lib/semester";
import { PageHeader } from "../../_components/PageHeader";
import { Card, CardHeader } from "../../_components/Card";
import { Table, Th, Td } from "../../_components/Table";
import { EmptyState } from "../../_components/EmptyState";
import { Button, LinkButton } from "../../_components/Button";
import { Input, Select } from "../../_components/Field";
import { DeleteMemberButton } from "./_components/DeleteMemberButton";

export default async function AdminPanelListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; semester?: string }>;
}) {
  const { q = "", semester = "" } = await searchParams;

  const where: Prisma.PanelMemberWhereInput = {};
  if (semester) where.semester = semester;
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { role: { contains: q, mode: "insensitive" } },
      { wing: { contains: q, mode: "insensitive" } },
      { memberId: { contains: q, mode: "insensitive" } },
    ];
  }

  const [members, allSemesters] = await Promise.all([
    prisma.panelMember.findMany({
      where,
      orderBy: [
        { semester: "desc" },
        { orderIndex: "asc" },
        { name: "asc" },
      ],
    }),
    prisma.panelMember.findMany({
      distinct: ["semester"],
      select: { semester: true },
      orderBy: { semester: "desc" },
    }),
  ]);

  const groups = new Map<string, typeof members>();
  for (const member of members) {
    const bucket = groups.get(member.semester) ?? [];
    bucket.push(member);
    groups.set(member.semester, bucket);
  }

  const filtered = Boolean(q || semester);

  return (
    <>
      <PageHeader
        title="Panel members"
        description="The executive committee roster shown on the public site."
        action={
          <LinkButton href="/admin/panel/new">Add member</LinkButton>
        }
      />

      <form
        method="get"
        className="mb-6 flex flex-wrap items-end gap-3 rounded-[1.75rem] border border-white/60 bg-white/70 p-5 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
      >
        <div className="min-w-56 flex-1">
          <label
            htmlFor="q"
            className="mb-1.5 block text-sm font-bold text-gray-900"
          >
            Search
          </label>
          <Input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Name, role, wing or student ID"
          />
        </div>

        <div className="w-52">
          <label
            htmlFor="semester"
            className="mb-1.5 block text-sm font-bold text-gray-900"
          >
            Semester
          </label>
          <Select id="semester" name="semester" defaultValue={semester}>
            <option value="">All semesters</option>
            {allSemesters.map((s) => (
              <option key={s.semester} value={s.semester}>
                {semesterLabel(s.semester)}
              </option>
            ))}
          </Select>
        </div>

        <Button type="submit" variant="secondary">
          Apply
        </Button>
        {filtered && (
          <LinkButton href="/admin/panel" variant="ghost">
            Clear
          </LinkButton>
        )}
      </form>

      {members.length === 0 ? (
        <Card>
          <EmptyState
            title={filtered ? "No members match that search" : "No panel members yet"}
            description={
              filtered
                ? "Try a different name, or clear the filters."
                : "Add the first committee member to get started."
            }
            action={
              filtered ? (
                <LinkButton href="/admin/panel" variant="secondary">
                  Clear filters
                </LinkButton>
              ) : (
                <LinkButton href="/admin/panel/new">Add member</LinkButton>
              )
            }
          />
        </Card>
      ) : (
        <div className="space-y-6">
          {[...groups.entries()].map(([slug, rows]) => (
            <Card key={slug}>
              <CardHeader
                title={`${semesterLabel(slug)} \u00b7 ${rows.length} member${rows.length === 1 ? "" : "s"}`}
              />
              <Table>
                <thead>
                  <tr>
                    <Th className="w-16">Order</Th>
                    <Th>Name</Th>
                    <Th>Role</Th>
                    <Th>Wing</Th>
                    <Th className="w-20">Photo</Th>
                    <Th className="w-40 text-right">Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((member) => (
                    <tr key={member.id} className="transition-colors hover:bg-white/60">
                      <Td className="tabular-nums text-gray-400">
                        {member.orderIndex}
                      </Td>
                      <Td className="whitespace-nowrap">
                        <span className="font-black tracking-tight text-gray-950">
                          {member.name}
                        </span>
                        {member.memberId && (
                          <span className="block text-xs text-gray-500">
                            {member.memberId}
                          </span>
                        )}
                      </Td>
                      <Td>{member.role}</Td>
                      <Td className="text-gray-500">{member.wing ?? "\u2014"}</Td>
                      <Td>
                        {member.imageUrl ? (
                          <Image
                            src={member.imageUrl}
                            alt=""
                            width={36}
                            height={36}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-xs font-bold text-amber-700">
                            Missing
                          </span>
                        )}
                      </Td>
                      <Td className="text-right">
                        <div className="flex justify-end gap-1">
                          <LinkButton
                            href={`/admin/panel/${member.id}`}
                            variant="secondary"
                            size="sm"
                          >
                            Edit
                          </LinkButton>
                          <DeleteMemberButton
                            id={member.id}
                            name={member.name}
                          />
                        </div>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
