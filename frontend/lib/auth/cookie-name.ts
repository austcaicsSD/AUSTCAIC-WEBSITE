// Separate from session.ts so proxy.ts can import the name without pulling in
// server-only modules.
export const ADMIN_COOKIE_NAME = "austcaic_admin";

/**
 * Readable by the public nav so it can offer a way back to the dashboard.
 * Carries no credential - the real session cookie stays scoped to /admin, and
 * forging this only reveals a link that the guards will still reject.
 */
export const ADMIN_HINT_COOKIE_NAME = "austcaic_admin_hint";
