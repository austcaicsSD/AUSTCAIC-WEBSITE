# Admin panel

Staff tool at `/admin` for maintaining the executive committee roster shown on
the public site. Built on Next.js 16 (App Router), Prisma and Supabase.

---

## 1. Layout of the code

```
app/
  (site)/            public pages - owns the nav, footer, announcement bar
  admin/
    actions.ts       loginAdmin / logoutAdmin
    _components/     admin UI primitives (Button, Card, Table, Field, ...)
    (dashboard)/     everything behind the auth gate
      layout.tsx     authoritative auth check + admin shell
      page.tsx       dashboard: counts and recent audit entries
      panel/         panel member CRUD
lib/
  auth/              tokens, session cookie, password hashing, requireAdmin
  storage/           panel photo upload and validation
  validation/        zod schemas shared by client and server
  audit.ts           writeAuditLog
  rate-limit.ts      DB-backed attempt caps
proxy.ts             route guard (Next 16 renamed `middleware`)
```

Public routes live in the `(site)` route group so `/admin` inherits none of the
site chrome and skips the semester query the public nav needs. Route groups do
not affect URLs.

---

## 2. How authentication works

Three independent gates. Each assumes the others may be missing.

1. **`proxy.ts`** — runs before routing on `/admin/:path*`. Verifies the JWT
   signature only, no database access. Redirects to `/login?as=admin` when the
   cookie is absent, expired or tampered with. Also redirects `/admin/login`,
   which no longer exists.
2. **`app/admin/(dashboard)/layout.tsx`** — the authoritative check. Loads the
   admin row and confirms it still exists, is still active, and that
   `tokenVersion` still matches the cookie.
3. **Every mutating server action** calls `requireAdmin()` itself.

The third gate is not redundant. A valid signature is not proof of anything: an
account can be deactivated while its cookie is still perfectly valid. Only a
database check catches that, and the proxy cannot do database checks.

**Session cookie** — signed with `jose` (HS256), 8 hour expiry, claims are
`sub` and `tokenVersion`. Stored `httpOnly`, `secure` in production,
`sameSite=lax`, scoped to `path=/admin` so it is never sent with public page
requests. Token verification pins the algorithm, which blocks algorithm
substitution.

**Passwords** — bcrypt, cost 12. Login records every attempt in
`login_attempts` and locks an email out for 15 minutes after 5 failures.
Unknown emails are compared against a dummy hash so response times do not
reveal whether an account exists, and the error text never distinguishes a
wrong password from an unknown email.

**Invalidating sessions** — increment `tokenVersion` on the admin row. Gate 2
then rejects every token issued before the change.

---

## 3. Managing admins

Accounts are not self-service. There is no signup, and no password reset by
email.

**If you have the database connection string:**

```bash
cd frontend
node --env-file=.env scripts/create-admin.mjs
```

Prompts for name, email and password, then writes the row. Re-running for an
existing email offers to reset the password and bumps `tokenVersion`.

**If you do not have database access** — the usual case for most committee
members:

```bash
cd frontend
node scripts/hash-password.mjs
```

This never touches the database. It prints a complete `insert` statement with
the hash already embedded, which you hand to whoever holds the credentials.
Send them the statement, never the password.

> Copy the whole statement. A stored `passwordHash` must be exactly 60
> characters beginning `$2b$12$`. Anything else — a stray quote, an angle
> bracket left over from a placeholder — fails as an ordinary wrong password
> with no clue as to why.

**Deactivating someone** (end of tenure, lost laptop):

```bash
node --env-file=.env scripts/set-admin-active.mjs someone@aust.edu off
```

Deactivate rather than delete. Deleting the row orphans their audit history.
Deactivating also bumps `tokenVersion`, so any active session dies immediately.

---

## 4. Adding a new admin module

Worked example: an "Events" section, following the panel module exactly.

**1. Model** in `prisma/schema.prisma`, then generate the migration against the
live schema rather than with `migrate dev`:

```bash
npx prisma migrate diff --from-schema-datasource prisma/schema.prisma \
  --to-schema-datamodel prisma/schema.prisma --script > migration.sql
```

Review the SQL, move it into `prisma/migrations/<timestamp>_add_events/`, then
`npx prisma migrate deploy`. **Never run `migrate dev` against production** — it
can offer to reset the database.

**2. Validation** in `lib/validation/events.ts`. Export the schema, a
`FormState` type and a `readEventForm(formData)` helper. The same schema must be
used on both sides; the client copy is a convenience, the server copy is the
rule.

**3. Actions** in `app/admin/(dashboard)/events/actions.ts`:

```ts
export async function createEvent(prev: EventFormState, formData: FormData) {
  const admin = await requireAdmin();            // always first

  const values = readEventForm(formData);
  const parsed = eventSchema.safeParse(values);
  if (!parsed.success) {
    return { fieldErrors: z.flattenError(parsed.error).fieldErrors, values };
  }

  const created = await prisma.$transaction(async (tx) => {
    const event = await tx.event.create({ data: parsed.data });
    await writeAuditLog(tx, {
      actor: admin,
      action: "event.create",
      entityType: "Event",
      entityId: event.id,
      after: event,
    });
    return event;
  });

  revalidatePath("/admin/events");
  redirect("/admin/events");
}
```

Four things are not optional:

- `requireAdmin()` is the first statement.
- The audit row is written **inside the transaction**, so a change can never
  commit without its trail.
- Failures return `values` as well as errors. React resets a form once its
  action resolves, so without the echo a validation error wipes every field.
- `redirect()` sits outside any `try`/`catch` — it works by throwing, and a
  `catch` will swallow it.

**4. Pages** — a server component for the list, a client form built from
`app/admin/_components`, and add the route to `AdminNav`.

**5. Deletes** use `ConfirmDialog` with a typed confirmation. Mount it only
while a confirmation is pending (`{target && <ConfirmDialog … />}`) so the typed
value resets naturally instead of needing an effect.

---

## 5. Photo upload

`lib/storage/panel-images.ts`, server-only, uses the Supabase service-role key.

Validation runs in order: 5 MB cap, MIME allow-list, **magic-byte sniff of the
buffer**, then a `sharp` re-encode to WebP capped at 1200px with EXIF dropped.
The re-encode is what makes a disguised file harmless — whatever was uploaded is
discarded and only bytes sharp produced are ever stored.

Object names are built from the record id and a content hash, never from the
uploaded filename. The hash means replacing a photo writes a *new* object, so
there are no stale CDN copies and nothing is destroyed before the database has
been updated.

Ordering is **upload → write → delete the old object**. If the write fails the
new object is removed; on delete the row goes first, so a storage failure leaves
an unreferenced file rather than a member whose photo has vanished.

---

## 6. Environment variables

| Name | Purpose | Notes |
|---|---|---|
| `DATABASE_URL` | App runtime | Transaction pooler, port 6543 |
| `DIRECT_URL` | Migrations | Port 5432. **Build fails without it** — `prisma generate` runs in `postinstall` and the schema references it |
| `AUTH_SECRET` | Signs admin session JWTs | 32+ chars. Changing it signs everyone out |
| `SUPABASE_URL` | Storage | |
| `SUPABASE_SERVICE_ROLE_KEY` | Storage writes | Full privilege, bypasses RLS. Server-side only, never `NEXT_PUBLIC_` |

All five must be set in Vercel for **Production and Preview**. Paste values
without the surrounding quotes that `.env` uses — dotenv strips them, Vercel
does not.

`npm run build` fails if any of these secrets appears in a client bundle.

> Save `.env` as plain UTF-8. A byte-order mark silently breaks only the
> **first** key: Node's `--env-file` reads it as `\ufeffDATABASE_URL`, while
> Next's own parser strips it — so the app runs and scripts mysteriously do not.

---

## 7. Before a release

- [ ] `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`
- [ ] Build log ends with `Client bundle clean - checked for:` listing all four secrets
- [ ] Sign in, then confirm `/admin` redirects to `/login?as=admin` in a private window
- [ ] Create a member, edit it, delete it; confirm all three appear in Recent activity
- [ ] Upload a photo; confirm it appears on the public panel page with no redeploy
- [ ] Try uploading a non-image renamed to `.jpg`; confirm it is rejected
- [ ] Public pages still render: `/`, `/panel/<semester>`, `/login`, `/register`
- [ ] Tab through the delete dialog; focus must not escape it

---

## 8. Known gaps

- **Member login is intentionally low-friction** — email, student ID and member
  ID, no password. Attempts are capped per email and per address, which makes
  bulk enumeration impractical, but it is not real authentication. Deliberate:
  members access class recordings, not anything sensitive.
- **`registerMember` never assigns `memberId`**, so new sign-ups cannot log in
  until someone fills it in by hand. There is no admin screen for this yet.
- **`notFound()` in the site tree responds 200, not 404**, because the loading
  boundary starts streaming first. Those pages are marked `noindex` instead.
  Deleting `app/(site)/panel/[semester]/loading.tsx` restores the true status at
  the cost of the skeleton.
- **Row Level Security is disabled on every table.** The connection string is
  the only thing protecting the data.
- **No verified backup.** A logical backup script exists in `scripts/`; a
  restore has never been tested.
