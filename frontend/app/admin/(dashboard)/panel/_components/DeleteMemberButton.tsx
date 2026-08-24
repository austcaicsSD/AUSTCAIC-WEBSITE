"use client";

import { useState, useTransition } from "react";
import { Button } from "@/app/admin/_components/Button";
import { ConfirmDialog } from "@/app/admin/_components/ConfirmDialog";
import { deletePanelMember } from "../actions";

export function DeleteMemberButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setConfirming(true)}>
        Delete
      </Button>

      {confirming && (
        <ConfirmDialog
          title="Delete panel member"
          description={`This permanently removes ${name} from the committee roster. It cannot be undone.`}
          confirmWord="DELETE"
          pending={pending}
          onCancel={() => setConfirming(false)}
          onConfirm={() =>
            startTransition(async () => {
              await deletePanelMember(id);
              setConfirming(false);
            })
          }
        />
      )}
    </>
  );
}
