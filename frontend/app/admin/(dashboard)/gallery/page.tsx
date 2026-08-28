import Image from "next/image";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../_components/PageHeader";
import { Card } from "../../_components/Card";
import { Table, Th, Td } from "../../_components/Table";
import { EmptyState } from "../../_components/EmptyState";
import { LinkButton } from "../../_components/Button";
import { Input } from "../../_components/Field";
import { DeleteMomentButton } from "./_components/DeleteMomentButton";
import { FilterSubmit } from "./_components/FilterSubmit";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export default async function AdminGalleryListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  const where: Prisma.GalleryMomentWhereInput = {};
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  const moments = await prisma.galleryMoment.findMany({
    where,
    orderBy: [{ momentDate: "desc" }, { orderIndex: "asc" }],
  });

  const filtered = Boolean(q);

  return (
    <>
      <PageHeader
        title="Gallery & Moments"
        description="Photos and highlights shown in the Club Gallery & Moments section on the public site."
        action={<LinkButton href="/admin/gallery/new">Add moment</LinkButton>}
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
            placeholder="Title or description"
          />
        </div>

        <FilterSubmit />
        {filtered && (
          <LinkButton href="/admin/gallery" variant="ghost">
            Clear
          </LinkButton>
        )}
      </form>

      {moments.length === 0 ? (
        <Card>
          <EmptyState
            title={filtered ? "No moments match that search" : "No gallery moments yet"}
            description={
              filtered
                ? "Try a different search, or clear the filter."
                : "Add the first photo to start building the gallery."
            }
            action={
              filtered ? (
                <LinkButton href="/admin/gallery" variant="secondary">
                  Clear filters
                </LinkButton>
              ) : (
                <LinkButton href="/admin/gallery/new">Add moment</LinkButton>
              )
            }
          />
        </Card>
      ) : (
        <Card>
          <Table>
            <thead>
              <tr>
                <Th className="w-20">Photo</Th>
                <Th>Title</Th>
                <Th>Date</Th>
                <Th className="w-16">Order</Th>
                <Th className="w-40 text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {moments.map((moment) => (
                <tr key={moment.id} className="transition-colors hover:bg-white/60">
                  <Td>
                    {moment.imageUrl ? (
                      <Image
                        src={moment.imageUrl}
                        alt=""
                        width={64}
                        height={48}
                        className="h-12 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-amber-700">
                        Missing
                      </span>
                    )}
                  </Td>
                  <Td className="whitespace-nowrap">
                    <span className="font-black tracking-tight text-gray-950">
                      {moment.title}
                    </span>
                    {moment.description && (
                      <span className="block max-w-xs truncate text-xs text-gray-500">
                        {moment.description}
                      </span>
                    )}
                  </Td>
                  <Td className="whitespace-nowrap text-gray-500">
                    {dateFormat.format(moment.momentDate)}
                  </Td>
                  <Td className="tabular-nums text-gray-400">
                    {moment.orderIndex}
                  </Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-1">
                      <LinkButton
                        href={`/admin/gallery/${moment.id}`}
                        variant="secondary"
                        size="sm"
                      >
                        Edit
                      </LinkButton>
                      <DeleteMomentButton id={moment.id} title={moment.title} />
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
