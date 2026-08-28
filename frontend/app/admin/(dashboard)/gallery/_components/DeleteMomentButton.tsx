"use client";

import { useState, useTransition } from "react";
import { Button } from "@/app/admin/_components/Button";
import { ConfirmDialog } from "@/app/admin/_components/ConfirmDialog";
import { deleteGalleryMoment } from "../actions";

export function DeleteMomentButton({
  id,
  title,
}: {
  id: string;
  title: string;
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
          title="Delete gallery moment"
          description={`This permanently removes "${title}" from the gallery. It cannot be undone.`}
          confirmWord="DELETE"
          pending={pending}
          onCancel={() => setConfirming(false)}
          onConfirm={() =>
            startTransition(async () => {
              await deleteGalleryMoment(id);
              setConfirming(false);
            })
          }
        />
      )}
    </>
  );
}
