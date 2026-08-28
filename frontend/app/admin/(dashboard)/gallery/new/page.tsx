import { PageHeader } from "../../../_components/PageHeader";
import { GalleryMomentForm } from "../_components/GalleryMomentForm";
import { createGalleryMoment } from "../actions";

export default async function NewGalleryMomentPage() {
  return (
    <>
      <PageHeader
        title="Add gallery moment"
        description="Adds a photo and details to the Club Gallery & Moments section."
      />
      <GalleryMomentForm action={createGalleryMoment} submitLabel="Add moment" />
    </>
  );
}
