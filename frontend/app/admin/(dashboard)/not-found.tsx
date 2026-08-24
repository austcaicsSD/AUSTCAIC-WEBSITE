import { Card } from "../_components/Card";
import { LinkButton } from "../_components/Button";
import { EmptyState } from "../_components/EmptyState";

export default function AdminNotFound() {
  return (
    <Card>
      <EmptyState
        title="That record no longer exists"
        description="It may have been deleted by another committee member since this page was opened."
        action={<LinkButton href="/admin/panel">Back to panel members</LinkButton>}
      />
    </Card>
  );
}
