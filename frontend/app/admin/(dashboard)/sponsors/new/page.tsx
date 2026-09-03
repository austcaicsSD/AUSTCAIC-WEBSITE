import { PageHeader } from "../../../_components/PageHeader";
import { SponsorForm } from "../_components/SponsorForm";
import { createSponsor } from "../actions";

export default async function NewSponsorPage() {
  return (
    <>
      <PageHeader
        title="Add sponsor"
        description="Adds an organization to the Sponsors & Partners Program section."
      />
      <SponsorForm action={createSponsor} submitLabel="Add sponsor" />
    </>
  );
}
