import Image from "next/image";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../_components/PageHeader";
import { Card } from "../../_components/Card";
import { Table, Th, Td } from "../../_components/Table";
import { EmptyState } from "../../_components/EmptyState";
import { LinkButton } from "../../_components/Button";
import { Input } from "../../_components/Field";
import { DeleteSponsorButton } from "./_components/DeleteSponsorButton";
import { FilterSubmit } from "./_components/FilterSubmit";
import { SPONSOR_TYPE_LABELS } from "@/lib/validation/sponsors";

export default async function AdminSponsorsListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  const where: Prisma.SponsorWhereInput = {};
  if (q) {
    where.name = { contains: q, mode: "insensitive" };
  }

  const sponsors = await prisma.sponsor.findMany({
    where,
    orderBy: [{ orderIndex: "asc" }, { name: "asc" }],
  });

  const filtered = Boolean(q);

  return (
    <>
      <PageHeader
        title="Sponsors & Partners"
        description="Organizations shown in the Sponsors & Partners Program section on the public site."
        action={<LinkButton href="/admin/sponsors/new">Add sponsor</LinkButton>}
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
            placeholder="Sponsor name"
          />
        </div>

        <FilterSubmit />
        {filtered && (
          <LinkButton href="/admin/sponsors" variant="ghost">
            Clear
          </LinkButton>
        )}
      </form>

      {sponsors.length === 0 ? (
        <Card>
          <EmptyState
            title={filtered ? "No sponsors match that search" : "No sponsors yet"}
            description={
              filtered
                ? "Try a different search, or clear the filter."
                : "Add the first sponsor or partner to get started."
            }
            action={
              filtered ? (
                <LinkButton href="/admin/sponsors" variant="secondary">
                  Clear filters
                </LinkButton>
              ) : (
                <LinkButton href="/admin/sponsors/new">Add sponsor</LinkButton>
              )
            }
          />
        </Card>
      ) : (
        <Card>
          <Table>
            <thead>
              <tr>
                <Th className="w-20">Logo</Th>
                <Th>Name</Th>
                <Th>Type</Th>
                <Th>Website</Th>
                <Th className="w-16">Order</Th>
                <Th className="w-40 text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {sponsors.map((sponsor) => (
                <tr key={sponsor.id} className="transition-colors hover:bg-white/60">
                  <Td>
                    {sponsor.imageUrl ? (
                      <Image
                        src={sponsor.imageUrl}
                        alt=""
                        width={64}
                        height={48}
                        className="h-12 w-16 rounded-lg object-contain bg-white"
                      />
                    ) : (
                      <span className="text-xs font-bold text-amber-700">
                        Missing
                      </span>
                    )}
                  </Td>
                  <Td className="whitespace-nowrap">
                    <span className="font-black tracking-tight text-gray-950">
                      {sponsor.name}
                    </span>
                  </Td>
                  <Td className="whitespace-nowrap text-gray-500">
                    {SPONSOR_TYPE_LABELS[sponsor.type]}
                  </Td>
                  <Td className="max-w-xs truncate text-gray-500">
                    {sponsor.websiteUrl ?? "—"}
                  </Td>
                  <Td className="tabular-nums text-gray-400">
                    {sponsor.orderIndex}
                  </Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-1">
                      <LinkButton
                        href={`/admin/sponsors/${sponsor.id}`}
                        variant="secondary"
                        size="sm"
                      >
                        Edit
                      </LinkButton>
                      <DeleteSponsorButton id={sponsor.id} name={sponsor.name} />
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
    </>
  );
}
