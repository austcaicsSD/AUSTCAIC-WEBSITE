"use client";

import Link from "next/link";
import { Card } from "../_components/Card";
import { Button, LinkButton } from "../_components/Button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Card className="p-8">
      <h1 className="text-2xl font-black tracking-tight text-gray-950">
        That action didn&apos;t complete
      </h1>
      <p className="mt-3 max-w-lg text-sm font-medium text-gray-500">
        Nothing was saved. If your session expired, signing in again usually
        fixes it.
      </p>

      {error.digest && (
        <p className="mt-4 font-mono text-xs text-gray-400">
          Reference: {error.digest}
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset}>Try again</Button>
        <LinkButton href="/admin" variant="secondary">
          Back to dashboard
        </LinkButton>
        <Link
          href="/login?as=admin"
          className="rounded-xl px-5 py-2.5 text-sm font-bold text-gray-500 transition-colors hover:bg-gray-900/5 hover:text-gray-900"
        >
          Sign in again
        </Link>
      </div>
    </Card>
  );
}
