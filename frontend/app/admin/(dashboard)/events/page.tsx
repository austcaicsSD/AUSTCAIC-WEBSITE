import Image from "next/image";
import React from "react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { EVENT_CATEGORY_LABELS } from "@/lib/validation/events";
import { PageHeader } from "../../_components/PageHeader";
import { Card, CardHeader } from "../../_components/Card";
import { Table, Th, Td } from "../../_components/Table";
import { EmptyState } from "../../_components/EmptyState";
import { LinkButton } from "../../_components/Button";
import { Input, Select } from "../../_components/Field";
import { FilterSubmit } from "../panel/_components/FilterSubmit";
import { DeleteEventButton } from "./_components/DeleteEventButton";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Dhaka",
});

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; when?: string }>;
}) {
  const { q = "", when = "" } = await searchParams;
  const now = new Date();

  const where: Prisma.EventWhereInput = {};
  if (when === "upcoming") where.startsAt = { gte: now };
  if (when === "past") where.startsAt = { lt: now };
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { venue: { contains: q, mode: "insensitive" } },
      { speaker: { contains: q, mode: "insensitive" } },
    ];
  }

  const events = await prisma.event.findMany({
    where,
    orderBy: [{ startsAt: "desc" }, { orderIndex: "asc" }],
  });

  const upcoming = events.filter((e) => e.startsAt >= now).reverse();
  const past = events.filter((e) => e.startsAt < now);
  const filtered = Boolean(q || when);

  const sections = [
    { key: "upcoming", title: "Upcoming Events", rows: upcoming },
    { key: "past", title: "Recent Club Actions", rows: past },
  ].filter((s) => s.rows.length > 0);

  return (
    <>
      <PageHeader
        title="Events"
        description="One list drives both homepage sections. Future dates appear as Upcoming Events; past dates move to Recent Club Actions on their own."
        action={<LinkButton href="/admin/events/new">Add event</LinkButton>}
      />

      <form
        method="get"
        className="mb-6 flex flex-wrap items-end gap-3 rounded-[1.75rem] border border-white/60 bg-white/70 p-5 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.04)]"
      >
        <div className="min-w-56 flex-1">
          <label htmlFor="q" className="mb-1.5 block text-sm font-bold text-gray-900">
            Search
          </label>
          <Input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Title, venue or speaker"
          />
        </div>

        <div className="w-52">
          <label htmlFor="when" className="mb-1.5 block text-sm font-bold text-gray-900">
            Show
          </label>
          <Select id="when" name="when" defaultValue={when}>
            <option value="">Everything</option>
            <option value="upcoming">Upcoming only</option>
            <option value="past">Past only</option>
          </Select>
        </div>

        <FilterSubmit />
        {filtered && (
          <LinkButton href="/admin/events" variant="ghost">
            Clear
          </LinkButton>
        )}
      </form>

      {events.length === 0 ? (
        <Card>
          <EmptyState
            title={filtered ? "No events match that search" : "No events yet"}
            description={
              filtered
                ? "Try a different search, or clear the filters."
                : "Add the first event and it will appear on the homepage straight away."
            }
            action={
              filtered ? (
                <LinkButton href="/admin/events" variant="secondary">
                  Clear filters
                </LinkButton>
              ) : (
                <LinkButton href="/admin/events/new">Add event</LinkButton>
              )
            }
          />
        </Card>
      ) : (
        <div className="space-y-6">
          {sections.map((section) => (
            <Card key={section.key}>
              <CardHeader
                title={`${section.title} \u00b7 ${section.rows.length}`}
              />
              <Table>
                <thead>
                  <tr>
                    <Th className="w-20">Photo</Th>
                    <Th>Event</Th>
                    <Th>When</Th>
                    <Th>Venue</Th>
                    <Th>Registration</Th>
                    <Th className="w-40 text-right">Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((event) => {
                    const started = event.startsAt < now;
                    const registration = event.registrationClosed
                      ? "Closed"
                      : started
                        ? "Ended"
                        : event.registrationUrl
                          ? "Open"
                          : "No link";

                    return (
                      <tr key={event.id} className="transition-colors hover:bg-white/60">
                        <Td>
                          {event.imageUrl ? (
                            <Image
                              src={event.imageUrl}
                              alt=""
                              width={48}
                              height={36}
                              className="h-9 w-12 rounded-lg object-cover"
                            />
                          ) : (
                            <span className="text-xs font-bold text-gray-400">None</span>
                          )}
                        </Td>
                        <Td>
                          <span className="block font-black tracking-tight text-gray-950">
                            {event.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            {EVENT_CATEGORY_LABELS[event.category]}
                          </span>
                        </Td>
                        <Td className="whitespace-nowrap text-gray-600">
                          {dateFormat.format(event.startsAt)}
                        </Td>
                        <Td className="text-gray-500">{event.venue ?? "\u2014"}</Td>
                        <Td>
                          <span
                            className={
                              registration === "Open"
                                ? "text-xs font-bold text-emerald-700"
                                : "text-xs font-bold text-gray-400"
                            }
                          >
                            {registration}
                          </span>
                        </Td>
                        <Td className="text-right">
                          <div className="flex justify-end gap-1">
                            <LinkButton
                              href={`/admin/events/${event.id}`}
                              variant="secondary"
                              size="sm"
                            >
                              Edit
                            </LinkButton>
                            <DeleteEventButton id={event.id} title={event.title} />
                          </div>
                        </Td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
