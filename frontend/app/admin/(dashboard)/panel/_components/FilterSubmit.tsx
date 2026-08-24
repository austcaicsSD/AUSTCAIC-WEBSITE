"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/app/admin/_components/Button";

export function FilterSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="secondary" disabled={pending}>
      {pending ? "Filtering\u2026" : "Apply"}
    </Button>
  );
}
