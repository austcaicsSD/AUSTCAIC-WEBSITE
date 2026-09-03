import "server-only";
import { createImageStore } from "./image-store";

const store = createImageStore({
  bucket: "event-images",
  maxEdge: 1600,
  purpose: "event photo",
});

export const uploadEventImage = (input: { file: File; eventId: string }) =>
  store.upload({ file: input.file, id: input.eventId });

export const deleteEventImage = store.remove;
