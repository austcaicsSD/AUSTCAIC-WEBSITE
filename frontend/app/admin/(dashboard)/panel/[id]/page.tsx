import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "../../../_components/PageHeader";
import { PanelMemberForm } from "../_components/PanelMemberForm";
import { getPanelFormOptions } from "../options";
import { updatePanelMember } from "../actions";

export default async function EditPanelMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [member, options] = await Promise.all([
    prisma.panelMember.findUnique({ where: { id } }),
    getPanelFormOptions(),
  ]);

  if (!member) notFound();

  return (
    <>
      <PageHeader title="Edit panel member" description={member.name} />
      <PanelMemberForm
        action={updatePanelMember.bind(null, member.id)}
        submitLabel="Save changes"
        initial={{
          name: member.name,
          role: member.role,
          semester: member.semester,
          wing: member.wing,
          memberId: member.memberId,
          personalEmail: member.personalEmail,
          facebookUrl: member.facebookUrl,
          linkedinUrl: member.linkedinUrl,
          orderIndex: member.orderIndex,
          imageUrl: member.imageUrl,
        }}
        {...options}
      />
    </>
  );
}
