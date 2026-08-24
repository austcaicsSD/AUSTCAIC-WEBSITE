import { PageHeader } from "../../../_components/PageHeader";
import { PanelMemberForm } from "../_components/PanelMemberForm";
import { getPanelFormOptions } from "../options";
import { createPanelMember } from "../actions";

export default async function NewPanelMemberPage() {
  const options = await getPanelFormOptions();

  return (
    <>
      <PageHeader
        title="Add panel member"
        description="Adds a member to the executive committee for a semester."
      />
      <PanelMemberForm
        action={createPanelMember}
        submitLabel="Add member"
        {...options}
      />
    </>
  );
}
