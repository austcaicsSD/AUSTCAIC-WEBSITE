"use client";

import { useState, useTransition } from "react";
import { Button } from "@/app/admin/_components/Button";
import { ConfirmDialog } from "@/app/admin/_components/ConfirmDialog";
import { deleteEvent } from "../actions";

export function DeleteEventButton({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => setConfirming(true)}>
        Delete
      </Button>

      {confirming && (
        <ConfirmDialog
          title="Delete event"
          description={`This permanently removes "${title}" and its photo. It cannot be undone.`}
          confirmWord="DELETE"
          pending={pending}
          onCancel={() => setConfirming(false)}
          onConfirm={() =>
            startTransition(async () => {
              await deleteEvent(id);
              setConfirming(false);
            })
          }
        />
      )}
    </>
  );
}
