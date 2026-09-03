import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../../_components/PageHeader";
import { SponsorForm } from "../_components/SponsorForm";
import { updateSponsor } from "../actions";

export default async function EditSponsorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sponsor = await prisma.sponsor.findUnique({ where: { id } });
  if (!sponsor) notFound();

  return (
    <>
      <PageHeader title="Edit sponsor" description={sponsor.name} />
      <SponsorForm
        action={updateSponsor.bind(null, sponsor.id)}
        submitLabel="Save changes"
        initial={{
          name: sponsor.name,
          type: sponsor.type,
          websiteUrl: sponsor.websiteUrl,
          orderIndex: sponsor.orderIndex,
          imageUrl: sponsor.imageUrl,
        }}
      />
    </>
  );
}
