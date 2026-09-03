import { PageHeader } from "../../../_components/PageHeader";
import { EventForm } from "../_components/EventForm";
import { createEvent } from "../actions";

export default function NewEventPage() {
  return (
    <>
      <PageHeader
        title="Add event"
        description="Shows under Upcoming Events until it starts, then under Recent Club Actions."
      />
      <EventForm action={createEvent} submitLabel="Add event" />
    </>
  );
}
