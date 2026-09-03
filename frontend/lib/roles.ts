/** Committee hierarchy, shared by the public panel page and the admin list. */

/** Seniority order within the presidential group, not just membership. */
export const PRESIDENTIAL_ROLES = [
  "Advisor",
  "Treasurer",
  "President",
  "Vice President",
  "General Secretary",
  "Joint Secretary",
  "Organizing Secretary",
] as const;

export const PRESIDENTIAL_GROUP = "Presidential Panel";

export const ROLE_GROUP_ORDER = [
  PRESIDENTIAL_GROUP,
  "Executive Director",
  "Associate Director",
  "Associate Executive",
  "Sub Executive",
] as const;

export function roleGroup(role: string): string {
  return (PRESIDENTIAL_ROLES as readonly string[]).includes(role)
    ? PRESIDENTIAL_GROUP
    : role;
}

/** Lower sorts first. Unknown roles fall to the end rather than the top. */
export function roleRank(role: string): number {
  const index = (ROLE_GROUP_ORDER as readonly string[]).indexOf(roleGroup(role));
  return index === -1 ? ROLE_GROUP_ORDER.length : index;
}

/** Seniority inside the presidential group; 0 for every other role. */
export function seniorityRank(role: string): number {
  const index = (PRESIDENTIAL_ROLES as readonly string[]).indexOf(role);
  return index === -1 ? 0 : index;
}

/** Hierarchy, then seniority, then the manual ordering, then alphabetical. */
export function byRoleRank(
  a: { role: string; orderIndex: number; name: string },
  b: { role: string; orderIndex: number; name: string },
): number {
  return (
    roleRank(a.role) - roleRank(b.role) ||
    seniorityRank(a.role) - seniorityRank(b.role) ||
    a.orderIndex - b.orderIndex ||
    a.name.localeCompare(b.name)
  );
}
