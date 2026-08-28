"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Button } from "@/app/admin/_components/Button";
import { MAX_UPLOAD_BYTES } from "@/lib/storage/image-validation";

export function PhotoField({
  currentUrl,
  error,
}: {
  currentUrl: string | null;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);

  const shown = preview ?? (removing ? null : currentUrl);

  const pick = (file: File | null) => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(file ? URL.createObjectURL(file) : null);
    setFileName(file?.name ?? null);
    if (file) setRemoving(false);
  };

  const clearChoice = () => {
    if (inputRef.current) inputRef.current.value = "";
    pick(null);
  };

  return (
    <div className="mt-8 border-t border-gray-200/70 pt-8">
      <p className="mb-4 text-sm font-black tracking-tight text-gray-950">
        Photo
      </p>

      <div className="flex flex-wrap items-center gap-5">
        {shown ? (
          <Image
            key={shown}
            src={shown}
            alt=""
            width={120}
            height={90}
            unoptimized={Boolean(preview)}
            className="h-[90px] w-[120px] rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-[90px] w-[120px] items-center justify-center rounded-xl bg-gray-100 text-xs font-bold text-gray-400">
            None
          </div>
        )}

        <div className="space-y-2">
          <input
            ref={inputRef}
            id="photo"
            name="photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "photo-error" : undefined}
            onChange={(e) => pick(e.target.files?.[0] ?? null)}
            className="block w-full text-sm font-medium text-gray-600 file:mr-3 file:rounded-xl file:border-0 file:bg-gradient-to-r file:from-brandBlue file:to-brandPurple file:px-5 file:py-2.5 file:text-sm file:font-bold file:text-white hover:file:opacity-90"
          />

          <p className="text-xs text-gray-500">
            JPEG, PNG or WebP, up to {Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)}{" "}
            MB. Resized and converted to WebP on upload.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            {fileName && (
              <>
                <span className="text-xs font-bold text-gray-900">
                  {fileName}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearChoice}
                >
                  Undo
                </Button>
              </>
            )}

            {currentUrl && !fileName && (
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                <input
                  type="checkbox"
                  name="removePhoto"
                  checked={removing}
                  onChange={(e) => setRemoving(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Remove current photo
              </label>
            )}
          </div>
        </div>
      </div>

      {error && (
        <p id="photo-error" className="mt-3 text-xs font-bold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
