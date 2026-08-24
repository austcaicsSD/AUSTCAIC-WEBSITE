/** "fall-2025" -> "Fall 2025" */
export function semesterLabel(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
