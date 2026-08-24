<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AUSTCAIC website

Official club site. Public pages plus a staff admin panel at `/admin`.
Architecture and workflows: `docs/admin-panel.md`.

## Ground rules

- **Production database.** `DATABASE_URL` points at live data — 255 member
  records and the committee roster. Never run `prisma migrate dev`; use
  `migrate diff` → review the SQL → `migrate deploy`.
- Stop `next dev` before `prisma generate`, or the client DLL is locked and
  Turbopack panics.
- Verify claims by running something. Screenshots taken mid-animation and
  server actions that have not resolved both look like failures.

## Conventions

- **Structure.** Public routes live in `app/(site)`, which owns the site chrome.
  `app/admin` deliberately inherits none of it.
- **Server actions.** `requireAdmin()` first, then `zod`, then a transaction
  that writes the change and its `AuditLog` row together. `redirect()` goes
  outside any `try`/`catch`.
- **Forms.** Return submitted values alongside errors — React resets a form once
  its action resolves, so otherwise a validation error wipes every field.
- **Validation** lives in `lib/validation/` and is shared by both sides. The
  server copy is the rule.
- **Admin UI** is built from `app/admin/_components`. It follows the public
  site's visual language but with a weaker ambient layer: those screens are read,
  not admired.
- **Secrets** are server-only. `npm run build` fails if one reaches a client
  bundle.

## Next 16 specifics

`middleware.ts` is now `proxy.ts` and the export must be named `proxy`; it runs
on Node, not edge. `revalidateTag` takes a second argument. `params` and
`searchParams` are Promises. Read `node_modules/next/dist/docs/` before assuming
an API still behaves the way you remember.

## Verify

```bash
cd frontend
npm run typecheck && npm run lint && npm test && npm run build
```
