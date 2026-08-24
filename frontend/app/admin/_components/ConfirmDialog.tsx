"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "./Button";
import { Input } from "./Field";

/**
 * Render only while a confirmation is pending (`{target && <ConfirmDialog .../>}`)
 * so the typed value resets on every open without an effect.
 */
export function ConfirmDialog({
  title,
  description,
  confirmWord,
  confirmLabel = "Delete",
  pending = false,
  onCancel,
  onConfirm,
}: {
  title: string;
  description: string;
  confirmWord: string;
  confirmLabel?: string;
  pending?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const inputId = useId();
  const [typed, setTyped] = useState("");
  const matches = typed.trim() === confirmWord;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${inputId}-title`}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id={`${inputId}-title`}
          className="text-lg font-black tracking-tight text-gray-950"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>

        <label
          htmlFor={inputId}
          className="mt-5 mb-1.5 block text-sm font-bold text-gray-900"
        >
          Type <span className="font-mono text-red-600">{confirmWord}</span> to
          confirm
        </label>
        <Input
          id={inputId}
          autoFocus
          autoComplete="off"
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
        />

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel} disabled={pending}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={!matches || pending}
          >
            {pending ? "Working\u2026" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
