import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toLocalInputValue } from "@/lib/validation/events";
import { PageHeader } from "../../../_components/PageHeader";
import { EventForm } from "../_components/EventForm";
import { updateEvent } from "../actions";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) notFound();

  return (
    <>
      <PageHeader title="Edit event" description={event.title} />
      <EventForm
        action={updateEvent.bind(null, event.id)}
        submitLabel="Save changes"
        initial={{
          title: event.title,
          category: event.category,
          description: event.description,
          startsAt: toLocalInputValue(event.startsAt),
          endsAt: toLocalInputValue(event.endsAt),
          venue: event.venue,
          speaker: event.speaker,
          speakerRole: event.speakerRole,
          registrationUrl: event.registrationUrl,
          registrationClosed: event.registrationClosed,
          orderIndex: event.orderIndex,
          imageUrl: event.imageUrl,
        }}
      />
    </>
  );
}
