import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../../_components/PageHeader";
import { GalleryMomentForm } from "../_components/GalleryMomentForm";
import { updateGalleryMoment } from "../actions";

export default async function EditGalleryMomentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const moment = await prisma.galleryMoment.findUnique({ where: { id } });
  if (!moment) notFound();

  return (
    <>
      <PageHeader title="Edit gallery moment" description={moment.title} />
      <GalleryMomentForm
        action={updateGalleryMoment.bind(null, moment.id)}
        submitLabel="Save changes"
        initial={{
          title: moment.title,
          description: moment.description,
          momentDate: moment.momentDate.toISOString().slice(0, 10),
          orderIndex: moment.orderIndex,
          imageUrl: moment.imageUrl,
        }}
      />
    </>
  );
}
